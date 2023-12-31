// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProfileManager.sol";

contract FIRManagement {
    struct FIR {
        uint256 id;
        address complainant;
        string firURI;
        string districtName;
        uint256 stationId;
        uint256 timestamp;
        bool isResolved;
    }

    ProfileManager profileManager;
    uint256 private nextFIRId = 1;
    mapping(uint256 => FIR) private FIRs;

    event FIRFiled(uint256 id, address indexed complainant);
    event FIRResolved(uint256 id);

    constructor(address _profileManagerAddress) {
        profileManager = ProfileManager(_profileManagerAddress);
    }

    function fileFIR(
        string memory firURI,
        string memory districtName,
        uint256 stationId
    ) public returns (uint256) {
        FIRs[nextFIRId] = FIR(
            nextFIRId,
            msg.sender,
            firURI,
            districtName,
            stationId,
            block.timestamp,
            false
        );
        emit FIRFiled(nextFIRId, msg.sender);
        return nextFIRId++;
    }

    function getFIR(uint256 _firId) public view returns (FIR memory) {
        require(_firId > 0 && _firId < nextFIRId, "FIR does not exist");
        return FIRs[_firId];
    }

    function resolveFIR(uint256 _firId) public {
        string memory districtName = profileManager.getDistrictName(msg.sender);
        require(
            profileManager.policeStationToStationId(msg.sender, districtName) ==
                FIRs[_firId].stationId,
            "You cannot resolve this FIR."
        );
        require(_firId > 0 && _firId < nextFIRId, "FIR does not exist");
        FIRs[_firId].isResolved = true;
        emit FIRResolved(_firId);
    }
}
