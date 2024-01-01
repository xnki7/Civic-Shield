const contractAddressProfile = "0xC8eA3AbeEB7f4D782BC8C2C3E2F1E8AbF6664215";

const contractAbiProfile = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_IdNumber",
                "type": "string"
            },
            {
                "internalType": "enum ProfileManager.Designation",
                "name": "_designation",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_districtName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_profileImgCid",
                "type": "string"
            }
        ],
        "name": "createProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "IdNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum ProfileManager.Designation",
                "name": "designation",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "districtName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "profileImgCid",
                "type": "string"
            }
        ],
        "name": "ProfileCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "addressToProfile",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "IdNumber",
                "type": "string"
            },
            {
                "internalType": "enum ProfileManager.Designation",
                "name": "designation",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "districtName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "profileImgCid",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "districtToStationId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profileAddress",
                "type": "address"
            }
        ],
        "name": "getDistrictName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profileAddress",
                "type": "address"
            }
        ],
        "name": "getProfile",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "IdNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "enum ProfileManager.Designation",
                        "name": "designation",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "districtName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "profileImgCid",
                        "type": "string"
                    }
                ],
                "internalType": "struct ProfileManager.Profile",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "policeStationToStationId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "profileExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export { contractAddressProfile, contractAbiProfile };