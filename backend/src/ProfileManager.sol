//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProfileManager {
    struct Profile {
        string name;
        string IdNumber;
        string designation;
        string profileImgCid;
    }

    mapping(address => bool) public profileExists;
    mapping(address => Profile) public addressToProfile;

    event ProfileCreated(address indexed user, string name, string IdNumber, string designation, string profileImgCid);

    function createProfile(
        string memory _name,
        string memory _IdNumber,
        string memory _designation,
        string memory _profileImgCid
    ) public {
        require(profileExists[msg.sender] == false, "Profile already exists.");
        addressToProfile[msg.sender] = Profile(_name, _IdNumber, _designation, _profileImgCid);
        profileExists[msg.sender] = true;
        emit ProfileCreated(msg.sender, _name, _IdNumber, _designation, _profileImgCid);
    }

    function getProfile(address profileAddress) public view returns (Profile memory) {
        return addressToProfile[profileAddress];
    }
}
