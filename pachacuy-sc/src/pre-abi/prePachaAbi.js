module.exports = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAME_MANAGER",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfPachaPasses",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isPachaPass", type: "bool" },
          { internalType: "uint256", name: "pachaUuid", type: "uint256" },
          {
            internalType: "uint256",
            name: "typeOfDistribution",
            type: "uint256",
          },
          { internalType: "uint256", name: "uuid", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "string", name: "transferMode", type: "string" },
          {
            internalType: "address[]",
            name: "listPachaPassOwners",
            type: "address[]",
          },
        ],
        internalType: "struct Pacha.PachaPassInfo[]",
        name: "listOfPachaPasses",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfPachas",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isPacha", type: "bool" },
          { internalType: "bool", name: "isPublic", type: "bool" },
          { internalType: "uint256", name: "uuid", type: "uint256" },
          { internalType: "uint256", name: "pachaPassUuid", type: "uint256" },
          { internalType: "uint256", name: "pachaPassPrice", type: "uint256" },
          {
            internalType: "uint256",
            name: "typeOfDistribution",
            type: "uint256",
          },
          { internalType: "uint256", name: "idForJsonFile", type: "uint256" },
          { internalType: "uint256", name: "wasPurchased", type: "uint256" },
          { internalType: "uint256", name: "location", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          {
            internalType: "address[]",
            name: "listPachaPassOwners",
            type: "address[]",
          },
        ],
        internalType: "struct Pacha.PachaInfo[]",
        name: "listOfPachas",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_pachaPassUuid", type: "uint256" },
    ],
    name: "getPachaPassWithUuid",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isPachaPass", type: "bool" },
          { internalType: "uint256", name: "pachaUuid", type: "uint256" },
          {
            internalType: "uint256",
            name: "typeOfDistribution",
            type: "uint256",
          },
          { internalType: "uint256", name: "uuid", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "string", name: "transferMode", type: "string" },
          {
            internalType: "address[]",
            name: "listPachaPassOwners",
            type: "address[]",
          },
        ],
        internalType: "struct Pacha.PachaPassInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "getPachaWithUuid",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isPacha", type: "bool" },
          { internalType: "bool", name: "isPublic", type: "bool" },
          { internalType: "uint256", name: "uuid", type: "uint256" },
          { internalType: "uint256", name: "pachaPassUuid", type: "uint256" },
          { internalType: "uint256", name: "pachaPassPrice", type: "uint256" },
          {
            internalType: "uint256",
            name: "typeOfDistribution",
            type: "uint256",
          },
          { internalType: "uint256", name: "idForJsonFile", type: "uint256" },
          { internalType: "uint256", name: "wasPurchased", type: "uint256" },
          { internalType: "uint256", name: "location", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          {
            internalType: "address[]",
            name: "listPachaPassOwners",
            type: "address[]",
          },
        ],
        internalType: "struct Pacha.PachaInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_location", type: "uint256" }],
    name: "isPachaAlreadyTaken",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_idForJsonFile", type: "uint256" },
      { internalType: "uint256", name: "_pachaUuid", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    name: "registerPacha",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_pachaUuid", type: "uint256" },
      { internalType: "uint256", name: "_pachaPassUuid", type: "uint256" },
      { internalType: "string", name: "_transferMode", type: "string" },
    ],
    name: "registerPachaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_pachaUuid", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_typeOfDistribution", type: "uint256" },
    ],
    name: "setPachaPrivacyAndDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "setPachaToPublic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_infoAddress", type: "address" },
    ],
    name: "setPachacuyInfoAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_prefix", type: "string" },
      { internalType: "uint256", name: "_pachaUuid", type: "uint256" },
    ],
    name: "tokenUri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
