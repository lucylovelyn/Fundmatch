// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract FounderRegistry {

    struct FounderProfile {
        euint32 arr;
        euint32 growth;
        euint32 runway;
        euint32 industry;
        euint32 stage;
        bool registered;
        uint256 registeredAt;
    }

    mapping(address => FounderProfile) private profiles;
    address[] public founderAddresses;

    event FounderRegistered(address indexed founder, uint256 timestamp);
    event FounderUpdated(address indexed founder, uint256 timestamp);

    function registerFounder(
        InEuint32 calldata _arr,
        InEuint32 calldata _growth,
        InEuint32 calldata _runway,
        InEuint32 calldata _industry,
        InEuint32 calldata _stage
    ) external {
        FounderProfile storage profile = profiles[msg.sender];

        euint32 arrHandle      = FHE.asEuint32(_arr);
        euint32 growthHandle   = FHE.asEuint32(_growth);
        euint32 runwayHandle   = FHE.asEuint32(_runway);
        euint32 industryHandle = FHE.asEuint32(_industry);
        euint32 stageHandle    = FHE.asEuint32(_stage);

        FHE.allowThis(arrHandle);
        FHE.allowThis(growthHandle);
        FHE.allowThis(runwayHandle);
        FHE.allowThis(industryHandle);
        FHE.allowThis(stageHandle);

        profile.arr      = arrHandle;
        profile.growth   = growthHandle;
        profile.runway   = runwayHandle;
        profile.industry = industryHandle;
        profile.stage    = stageHandle;
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
        euint32 arr,
        euint32 growth,
        euint32 runway,
        euint32 industry,
        euint32 stage,
        bool registered,
        uint256 registeredAt
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