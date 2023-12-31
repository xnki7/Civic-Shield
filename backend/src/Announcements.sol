// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProfileManager.sol";

contract Announcements {
    ProfileManager profileManager;

    constructor(address _profileManagerAddress) {
        profileManager = ProfileManager(_profileManagerAddress);
    }

    struct Announcement {
        address creator;
        string announcementCID;
    }

    event StatePublicAnnouncementCreated(address indexed creator, string announcementCID);
    event StatePoliceAnnouncementCreated(address indexed creator, string announcementCID);
    event DistrictPublicAnnouncementCreated(address indexed creator, string announcementCID, string districtName);
    event DistrictPoliceAnnouncementCreated(address indexed creator, string announcementCID, string districtName);

    Announcement[] private statePublicBulletin;
    Announcement[] private statePoliceBulletin;

    mapping(string => Announcement[]) private districtPublicBulletin;
    mapping(string => Announcement[]) private districtPoliceBulletin;

    function createStatePublicAnnouncement(string memory _announcementCID) public {
        require(profileManager.profileExists(msg.sender) == true, "User profile does not exist.");
        Announcement memory announcement = Announcement(msg.sender, _announcementCID);
        statePublicBulletin.push(announcement);
        emit StatePublicAnnouncementCreated(msg.sender, _announcementCID);
    }

    function createStatePoliceAnnouncement(string memory _announcementCID) public {
        require(profileManager.profileExists(msg.sender) == true, "User profile does not exist.");
        Announcement memory announcement = Announcement(msg.sender, _announcementCID);
        statePoliceBulletin.push(announcement);
        emit StatePoliceAnnouncementCreated(msg.sender, _announcementCID);
    }

    function createDistrictPublicAnnouncement(string memory _announcementCID, string memory _districtName) public {
        require(profileManager.profileExists(msg.sender) == true, "User profile does not exist.");
        Announcement memory announcement = Announcement(msg.sender, _announcementCID);
        districtPublicBulletin[_districtName].push(announcement);
        emit DistrictPublicAnnouncementCreated(msg.sender, _announcementCID, _districtName);
    }

    function createDistrictPoliceAnnouncement(string memory _announcementCID, string memory _districtName) public {
        require(profileManager.profileExists(msg.sender) == true, "User profile does not exist.");
        Announcement memory announcement = Announcement(msg.sender, _announcementCID);
        districtPoliceBulletin[_districtName].push(announcement);
        emit DistrictPoliceAnnouncementCreated(msg.sender, _announcementCID, _districtName);
    }

    function getStatePublicAnnouncements() public view returns (Announcement[] memory) {
        return statePublicBulletin;
    }

    function getStatePoliceAnnouncements() public view returns (Announcement[] memory) {
        return statePoliceBulletin;
    }

    function getDistrictPublicAnnouncements(string memory _districtName) public view returns (Announcement[] memory) {
        return districtPublicBulletin[_districtName];
    }

    function getDistrictPoliceAnnouncements(string memory _districtName) public view returns (Announcement[] memory) {
        return districtPoliceBulletin[_districtName];
    }
}
