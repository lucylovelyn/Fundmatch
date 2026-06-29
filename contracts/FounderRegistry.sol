// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract FounderRegistry {

    struct FounderProfile {
        uint32 arr;
        uint32 growth;
        uint32 runway;
        uint32 industry;
        uint32 stage;
        bool registered;
        uint256 registeredAt;
    }

    mapping(address => FounderProfile) private profiles;
    address[] public founderAddresses;

    event FounderRegistered(address indexed founder, uint256 timestamp);
    event FounderUpdated(address indexed founder, uint256 timestamp);

    function registerFounder(
        uint32 _arr,
        uint32 _growth,
        uint32 _runway,
        uint32 _industry,
        uint32 _stage
    ) external {
        FounderProfile storage profile = profiles[msg.sender];
        profile.arr      = _arr;
        profile.growth   = _growth;
        profile.runway   = _runway;
        profile.industry = _industry;
        profile.stage    = _stage;
        profile.registeredAt = block.timestamp;

        if (!profile.registered) {
            profile.registered = true;
            founderAddresses.push(msg.sender);
            emit FounderRegistered(msg.sender, block.timestamp);
        } else {
            emit FounderUpdated(msg.sender, block.timestamp);
        }
    }

    function getProfile(address founder) external view returns (
        uint32 arr, uint32 growth, uint32 runway,
        uint32 industry, uint32 stage,
        bool registered, uint256 registeredAt
    ) {
        FounderProfile storage p = profiles[founder];
        return (p.arr, p.growth, p.runway, p.industry, p.stage, p.registered, p.registeredAt);
    }

    function isRegistered(address founder) external view returns (bool) {
        return profiles[founder].registered;
    }

    function founderCount() external view returns (uint256) {
        return founderAddresses.length;
    }
}