const contractAddressAnnouncement = "0xf4b36a1609fFA1727921A13FA81Caa22676fcA16";

const contractAbiAnnouncement = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_announcementCID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_districtName",
                "type": "string"
            }
        ],
        "name": "createDistrictPoliceAnnouncement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_announcementCID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_districtName",
                "type": "string"
            }
        ],
        "name": "createDistrictPublicAnnouncement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_announcementCID",
                "type": "string"
            }
        ],
        "name": "createStatePoliceAnnouncement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_announcementCID",
                "type": "string"
            }
        ],
        "name": "createStatePublicAnnouncement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_profileManagerAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "announcementCID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "districtName",
                "type": "string"
            }
        ],
        "name": "DistrictPoliceAnnouncementCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "announcementCID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "districtName",
                "type": "string"
            }
        ],
        "name": "DistrictPublicAnnouncementCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "announcementCID",
                "type": "string"
            }
        ],
        "name": "StatePoliceAnnouncementCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "announcementCID",
                "type": "string"
            }
        ],
        "name": "StatePublicAnnouncementCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_districtName",
                "type": "string"
            }
        ],
        "name": "getDistrictPoliceAnnouncements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "announcementCID",
                        "type": "string"
                    }
                ],
                "internalType": "struct Announcements.Announcement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_districtName",
                "type": "string"
            }
        ],
        "name": "getDistrictPublicAnnouncements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "announcementCID",
                        "type": "string"
                    }
                ],
                "internalType": "struct Announcements.Announcement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStatePoliceAnnouncements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "announcementCID",
                        "type": "string"
                    }
                ],
                "internalType": "struct Announcements.Announcement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStatePublicAnnouncements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "announcementCID",
                        "type": "string"
                    }
                ],
                "internalType": "struct Announcements.Announcement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export { contractAddressAnnouncement, contractAbiAnnouncement };