const contractAddressFIR = "0x9a874eaB8f9F70e756Ac12581ab2e80D2dbEEA65";

const contractAbiFIR = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "firURI",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "districtName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "stationId",
                "type": "uint256"
            }
        ],
        "name": "fileFIR",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
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
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "complainant",
                "type": "address"
            }
        ],
        "name": "FIRFiled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "FIRResolved",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_firId",
                "type": "uint256"
            }
        ],
        "name": "resolveFIR",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_firId",
                "type": "uint256"
            }
        ],
        "name": "getFIR",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "complainant",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "firURI",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "districtName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stationId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isResolved",
                        "type": "bool"
                    }
                ],
                "internalType": "struct FIRManagement.FIR",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export { contractAddressFIR, contractAbiFIR };