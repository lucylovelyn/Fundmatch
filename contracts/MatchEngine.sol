// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./FounderRegistry.sol";
import "./InvestorRegistry.sol";

contract MatchEngine {

    FounderRegistry  public founderRegistry;
    InvestorRegistry public investorRegistry;

    struct MatchResult {
        uint32 arrMet;
        uint32 growthMet;
        uint32 runwayMet;
        uint32 industryMet;
        uint32 score;
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

        (uint32 fArr, uint32 fGrowth, uint32 fRunway, uint32 fIndustry, , , ) = founderRegistry.getProfile(founder);
        (uint32 iMinArr, uint32 iMinGrowth, uint32 iMinRunway, uint32 iIndustry, , , ) = investorRegistry.getCriteria(investor);

        uint32 arrMet      = fArr      >= iMinArr      ? 25 : 0;
        uint32 growthMet   = fGrowth   >= iMinGrowth   ? 25 : 0;
        uint32 runwayMet   = fRunway   >= iMinRunway   ? 25 : 0;
        uint32 industryMet = fIndustry == iIndustry    ? 25 : 0;
        uint32 totalScore  = arrMet + growthMet + runwayMet + industryMet;

        MatchResult storage result = matchResults[investor][founder];
        result.arrMet      = arrMet;
        result.growthMet   = growthMet;
        result.runwayMet   = runwayMet;
        result.industryMet = industryMet;
        result.score       = totalScore;
        result.computed    = true;
        result.computedAt  = block.timestamp;

        emit MatchComputed(investor, founder, block.timestamp);
    }

    function getMatchResult(address investor, address founder) external view returns (
        uint32 arrMet, uint32 growthMet, uint32 runwayMet,
        uint32 industryMet, uint32 score,
        bool computed, uint256 computedAt
    ) {
        MatchResult storage r = matchResults[investor][founder];
        return (r.arrMet, r.growthMet, r.runwayMet, r.industryMet, r.score, r.computed, r.computedAt);
    }

    function hasMatch(address investor, address founder) external view returns (bool) {
        return matchResults[investor][founder].computed;
    }
}