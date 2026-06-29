// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract InvestorRegistry {

    struct InvestorCriteria {
        uint32 minArr;
        uint32 minGrowth;
        uint32 minRunway;
        uint32 targetIndustry;
        uint32 targetStage;
        bool registered;
        uint256 registeredAt;
    }

    mapping(address => InvestorCriteria) private criteria;
    address[] public investorAddresses;

    event InvestorRegistered(address indexed investor, uint256 timestamp);
    event InvestorUpdated(address indexed investor, uint256 timestamp);

    function registerInvestor(
        uint32 _minArr,
        uint32 _minGrowth,
        uint32 _minRunway,
        uint32 _targetIndustry,
        uint32 _targetStage
    ) external {
        InvestorCriteria storage c = criteria[msg.sender];
        c.minArr         = _minArr;
        c.minGrowth      = _minGrowth;
        c.minRunway      = _minRunway;
        c.targetIndustry = _targetIndustry;
        c.targetStage    = _targetStage;
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
        uint32 minArr, uint32 minGrowth, uint32 minRunway,
        uint32 targetIndustry, uint32 targetStage,
        bool registered, uint256 registeredAt
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