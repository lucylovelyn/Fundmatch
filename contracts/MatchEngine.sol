// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";
import "./FounderRegistry.sol";
import "./InvestorRegistry.sol";

contract MatchEngine {

    FounderRegistry  public founderRegistry;
    InvestorRegistry public investorRegistry;

    struct MatchResult {
        euint32 arrMet;
        euint32 growthMet;
        euint32 runwayMet;
        euint32 industryMet;
        euint32 score;
        bool computed;
        uint256 computedAt;
    }

    mapping(address => mapping(address => MatchResult)) private matchResults;

    event MatchComputed(address indexed investor, address indexed founder, uint256 timestamp);

    constructor(address _founderRegistry, address _investorRegistry) {
        founderRegistry  = FounderRegistry(_founderRegistry);
        investorRegistry = InvestorRegistry(_investorRegistry);
    }

    function computeMatch(address investor, address founder) external {
        require(founderRegistry.isRegistered(founder),   "Founder not registered");
        require(investorRegistry.isRegistered(investor), "Investor not registered");

        (euint32 fArr, euint32 fGrowth, euint32 fRunway, euint32 fIndustry, , , ) = founderRegistry.getProfile(founder);
        (euint32 iMinArr, euint32 iMinGrowth, euint32 iMinRunway, euint32 iIndustry, , , ) = investorRegistry.getCriteria(investor);

        ebool arrOk      = FHE.gte(fArr,      iMinArr);
        ebool growthOk   = FHE.gte(fGrowth,   iMinGrowth);
        ebool runwayOk   = FHE.gte(fRunway,   iMinRunway);
        ebool industryOk = FHE.eq(fIndustry,  iIndustry);

        euint32 zero    = FHE.asEuint32(0);
        euint32 twenty5 = FHE.asEuint32(25);

        euint32 arrScore      = FHE.select(arrOk,      twenty5, zero);
        euint32 growthScore   = FHE.select(growthOk,   twenty5, zero);
        euint32 runwayScore   = FHE.select(runwayOk,   twenty5, zero);
        euint32 industryScore = FHE.select(industryOk, twenty5, zero);

        euint32 totalScore = FHE.add(FHE.add(arrScore, growthScore), FHE.add(runwayScore, industryScore));

        MatchResult storage result = matchResults[investor][founder];

        FHE.allowThis(arrScore);
        FHE.allowThis(growthScore);
        FHE.allowThis(runwayScore);
        FHE.allowThis(industryScore);
        FHE.allowThis(totalScore);

        FHE.allow(arrScore,      investor);
        FHE.allow(growthScore,   investor);
        FHE.allow(runwayScore,   investor);
        FHE.allow(industryScore, investor);
        FHE.allow(totalScore,    investor);

        FHE.allow(arrScore,      founder);
        FHE.allow(growthScore,   founder);
        FHE.allow(runwayScore,   founder);
        FHE.allow(industryScore, founder);
        FHE.allow(totalScore,    founder);

        result.arrMet      = arrScore;
        result.growthMet   = growthScore;
        result.runwayMet   = runwayScore;
        result.industryMet = industryScore;
        result.score       = totalScore;
        result.computed    = true;
        result.computedAt  = block.timestamp;

        emit MatchComputed(investor, founder, block.timestamp);
    }

    function getMatchResult(address investor, address founder) external view returns (
        euint32 arrMet,
        euint32 growthMet,
        euint32 runwayMet,
        euint32 industryMet,
        euint32 score,
        bool computed,
        uint256 computedAt
    ) {
        MatchResult storage r = matchResults[investor][founder];
        return (r.arrMet, r.growthMet, r.runwayMet, r.industryMet, r.score, r.computed, r.computedAt);
    }

    function hasMatch(address investor, address founder) external view returns (bool) {
        return matchResults[investor][founder].computed;
    }
}