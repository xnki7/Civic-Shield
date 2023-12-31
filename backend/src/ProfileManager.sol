//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProfileManager {
    enum Designation {
        StateGovernment,
        PoliceStation,
        Civilian,
        Constable,
        HeadConstable,
        AssistantSubInspector,
        SubInspector,
        Inspector,
        DeputySuperintendentOfPolice,
        AdditionalSuperintendentOfPolice,
        SuperintendentOfPolice,
        SeniorSuperintendentOfPolice,
        DeputyInspectorGeneralOfPolice,
        InspectorGeneralOfPolice,
        AdditionalDirectorGeneralOfPolice,
        DirectorGeneralOfPolice
    }

    struct Profile {
        string name;
        string IdNumber;
        Designation designation;
        string districtName;
        string profileImgCid;
    }

    mapping(string => uint256) public districtToStationId;
    mapping(address => bool) public profileExists;
    mapping(address => Profile) public addressToProfile;
    mapping(address => mapping(string => uint256))
        public policeStationToStationId;

    event ProfileCreated(
        address indexed user,
        string name,
        string IdNumber,
        Designation designation,
        string districtName,
        string profileImgCid
    );

    function createProfile(
        string memory _name,
        string memory _IdNumber,
        Designation _designation,
        string memory _districtName,
        string memory _profileImgCid
    ) public {
        require(!profileExists[msg.sender], "Profile already exists.");
        if (uint256(_designation) == 1) {
            policeStationToStationId[msg.sender][
                _districtName
            ] = districtToStationId[_districtName]++;
        }
        addressToProfile[msg.sender] = Profile(
            _name,
            _IdNumber,
            _designation,
            _districtName,
            _profileImgCid
        );
        profileExists[msg.sender] = true;
        emit ProfileCreated(
            msg.sender,
            _name,
            _IdNumber,
            _designation,
            _districtName,
            _profileImgCid
        );
    }

    function getProfile(address profileAddress)
        public
        view
        returns (Profile memory)
    {
        require(profileExists[profileAddress], "Profile does not exist.");
        return addressToProfile[profileAddress];
    }

    function getDistrictName(address profileAddress)
        public
        view
        returns (string memory)
    {
        require(profileExists[profileAddress], "Profile does not exist.");
        return addressToProfile[profileAddress].districtName;
    }
}
