// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract InvestorRegistry {

    struct InvestorCriteria {
        euint32 minArr;
        euint32 minGrowth;
        euint32 minRunway;
        euint32 targetIndustry;
        euint32 targetStage;
        bool registered;
        uint256 registeredAt;
    }

    mapping(address => InvestorCriteria) private criteria;
    address[] public investorAddresses;

    event InvestorRegistered(address indexed investor, uint256 timestamp);
    event InvestorUpdated(address indexed investor, uint256 timestamp);

    function registerInvestor(
        InEuint32 calldata _minArr,
        InEuint32 calldata _minGrowth,
        InEuint32 calldata _minRunway,
        InEuint32 calldata _targetIndustry,
        InEuint32 calldata _targetStage
    ) external {
        InvestorCriteria storage c = criteria[msg.sender];

        euint32 minArrHandle    = FHE.asEuint32(_minArr);
        euint32 minGrowthHandle = FHE.asEuint32(_minGrowth);
        euint32 minRunwayHandle = FHE.asEuint32(_minRunway);
        euint32 industryHandle  = FHE.asEuint32(_targetIndustry);
        euint32 stageHandle     = FHE.asEuint32(_targetStage);

        FHE.allowThis(minArrHandle);
        FHE.allowThis(minGrowthHandle);
        FHE.allowThis(minRunwayHandle);
        FHE.allowThis(industryHandle);
        FHE.allowThis(stageHandle);

        c.minArr         = minArrHandle;
        c.minGrowth      = minGrowthHandle;
        c.minRunway      = minRunwayHandle;
        c.targetIndustry = industryHandle;
        c.targetStage    = stageHandle;
        c.registeredAt   = block.timestamp;

        if (!c.registered) {
            c.registered = true;
            investorAddresses.push(msg.sender);
            emit InvestorRegistered(msg.sender, block.timestamp);
        } else {
            emit InvestorUpdated(msg.sender, block.timestamp);
        }
    }

    function getCriteria(address investor) external view returns (
        euint32 minArr,
        euint32 minGrowth,
        euint32 minRunway,
        euint32 targetIndustry,
        euint32 targetStage,
        bool registered,
        uint256 registeredAt
    ) {
        InvestorCriteria storage c = criteria[investor];
        return (c.minArr, c.minGrowth, c.minRunway, c.targetIndustry, c.targetStage, c.registered, c.registeredAt);
    }

    function isRegistered(address investor) external view returns (bool) {
        return criteria[investor].registered;
    }

    function investorCount() external view returns (uint256) {
        return investorAddresses.length;
    }
}