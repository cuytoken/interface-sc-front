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
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "misayWasiUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pachaUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creationDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "misayWasiPrice",
        type: "uint256",
      },
    ],
    name: "PurchaseMisayWasi",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "misayWasiUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pachaUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOfTickets",
        type: "uint256",
      },
    ],
    name: "PurchaseTicketFromMisayWasi",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "misayWasiUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rafflePrize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "raffleTax",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketUuid",
        type: "uint256",
      },
    ],
    name: "RaffleContestFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "misayWasiUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rafflePrize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignStartDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignEndDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pachaUuid",
        type: "uint256",
      },
    ],
    name: "RaffleStarted",
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
    name: "RNG_GENERATOR",
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
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "_randomNumbers", type: "uint256[]" },
    ],
    name: "fulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfActiveMWRaffles",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "misayWasiUuid", type: "uint256" },
          { internalType: "uint256", name: "pachaUuid", type: "uint256" },
          { internalType: "uint256", name: "creationDate", type: "uint256" },
          { internalType: "uint256", name: "ticketPrice", type: "uint256" },
          { internalType: "uint256", name: "ticketUuid", type: "uint256" },
          { internalType: "uint256", name: "misayWasiPrice", type: "uint256" },
          { internalType: "uint256", name: "rafflePrize", type: "uint256" },
          {
            internalType: "uint256",
            name: "numberTicketsPurchased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "campaignStartDate",
            type: "uint256",
          },
          { internalType: "uint256", name: "campaignEndDate", type: "uint256" },
          { internalType: "bool", name: "isCampaignActive", type: "bool" },
          { internalType: "bool", name: "hasMisayWasi", type: "bool" },
          {
            internalType: "address[]",
            name: "listOfParticipants",
            type: "address[]",
          },
        ],
        internalType: "struct MisayWasi.MisayWasiInfo[]",
        name: "listOfMisayWasis",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListOfMisayWasisReadyToRaffle",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_listOfRafflesToStart",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_misayWasiUuid", type: "uint256" },
    ],
    name: "getMisayWasiWithUuid",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "misayWasiUuid", type: "uint256" },
          { internalType: "uint256", name: "pachaUuid", type: "uint256" },
          { internalType: "uint256", name: "creationDate", type: "uint256" },
          { internalType: "uint256", name: "ticketPrice", type: "uint256" },
          { internalType: "uint256", name: "ticketUuid", type: "uint256" },
          { internalType: "uint256", name: "misayWasiPrice", type: "uint256" },
          { internalType: "uint256", name: "rafflePrize", type: "uint256" },
          {
            internalType: "uint256",
            name: "numberTicketsPurchased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "campaignStartDate",
            type: "uint256",
          },
          { internalType: "uint256", name: "campaignEndDate", type: "uint256" },
          { internalType: "bool", name: "isCampaignActive", type: "bool" },
          { internalType: "bool", name: "hasMisayWasi", type: "bool" },
          {
            internalType: "address[]",
            name: "listOfParticipants",
            type: "address[]",
          },
        ],
        internalType: "struct MisayWasi.MisayWasiInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_ticketUuid", type: "uint256" }],
    name: "getMiswayWasiWithTicketUuid",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "misayWasiUuid", type: "uint256" },
          { internalType: "uint256", name: "pachaUuid", type: "uint256" },
          { internalType: "uint256", name: "creationDate", type: "uint256" },
          { internalType: "uint256", name: "ticketPrice", type: "uint256" },
          { internalType: "uint256", name: "ticketUuid", type: "uint256" },
          { internalType: "uint256", name: "misayWasiPrice", type: "uint256" },
          { internalType: "uint256", name: "rafflePrize", type: "uint256" },
          {
            internalType: "uint256",
            name: "numberTicketsPurchased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "campaignStartDate",
            type: "uint256",
          },
          { internalType: "uint256", name: "campaignEndDate", type: "uint256" },
          { internalType: "bool", name: "isCampaignActive", type: "bool" },
          { internalType: "bool", name: "hasMisayWasi", type: "bool" },
          {
            internalType: "address[]",
            name: "listOfParticipants",
            type: "address[]",
          },
        ],
        internalType: "struct MisayWasi.MisayWasiInfo",
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
      { internalType: "uint256", name: "_pachaUuid", type: "uint256" },
      { internalType: "uint256", name: "_misayWasiUuid", type: "uint256" },
      { internalType: "uint256", name: "_misayWasiPrice", type: "uint256" },
    ],
    name: "registerMisayWasi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_misayWasiUuid", type: "uint256" },
      { internalType: "uint256", name: "_amountOfTickets", type: "uint256" },
      { internalType: "bool", name: "newCustomer", type: "bool" },
    ],
    name: "registerTicketPurchase",
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
      { internalType: "address", name: "_infoAddress", type: "address" },
    ],
    name: "setPachacuyInfoAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_misayWasiUuid", type: "uint256" },
      { internalType: "uint256", name: "_rafflePrize", type: "uint256" },
      { internalType: "uint256", name: "_ticketPrice", type: "uint256" },
      { internalType: "uint256", name: "_campaignEndDate", type: "uint256" },
    ],
    name: "startMisayWasiRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_misayWasiUuids", type: "uint256[]" },
    ],
    name: "startRaffleContest",
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
      { internalType: "uint256", name: "_uuid", type: "uint256" },
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
