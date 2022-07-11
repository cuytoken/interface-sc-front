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
        name: "_account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_guineaPigId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_uuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_raceAndGender",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceConsumer",
        type: "uint256",
      },
    ],
    name: "GuineaPigPurchaseFinish",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "_ix", type: "uint256" },
      {
        indexed: false,
        internalType: "address",
        name: "poolRewardsAddress",
        type: "address",
      },
    ],
    name: "GuineaPigPurchaseInit",
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
        internalType: "uint256",
        name: "chakraUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOfFood",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "availableFood",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "chakraOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pcuyReceived",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pcuyTaxed",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "tax", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceOwner",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceConsumer",
        type: "uint256",
      },
    ],
    name: "PurchaseFoodChakra",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "uuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "landPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_location",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "poolRewardsAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceConsumer",
        type: "uint256",
      },
    ],
    name: "PurchaseLand",
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
        internalType: "address",
        name: "pachaOwner",
        type: "address",
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
        name: "pachaPassUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pcuyReceived",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pcuyTaxed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceOwner",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceConsumer",
        type: "uint256",
      },
    ],
    name: "PurchasePachaPass",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "misayWasiOwner",
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
        name: "ticketUuid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceOwner",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balanceConsumer",
        type: "uint256",
      },
    ],
    name: "PurchaseTicket",
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
    name: "MONEY_TRANSFER",
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
    inputs: [],
    name: "busdToken",
    outputs: [
      { internalType: "contract IERC20Upgradeable", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256[]", name: "_randomNumbers", type: "uint256[]" },
    ],
    name: "fulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "_randomNumberGeneratorAddress",
        type: "address",
      },
      { internalType: "address", name: "_poolRewardsAddress", type: "address" },
      { internalType: "address", name: "_busdAddress", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nftProducerPachacuy",
    outputs: [
      {
        internalType: "contract INftProducerPachacuy",
        name: "",
        type: "address",
      },
    ],
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
    inputs: [],
    name: "poolRewardsAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "purchaseChakra",
    outputs: [{ internalType: "uint256", name: "chakraUuid", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_chakraUuid", type: "uint256" },
      { internalType: "uint256", name: "_amountFood", type: "uint256" },
      { internalType: "uint256", name: "_guineaPigUuid", type: "uint256" },
    ],
    name: "purchaseFoodFromChakra",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_ix", type: "uint256" }],
    name: "purchaseGuineaPigWithBusd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_ix", type: "uint256" }],
    name: "purchaseGuineaPigWithPcuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_location", type: "uint256" }],
    name: "purchaseLandWithBusd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_location", type: "uint256" }],
    name: "purchaseLandWithPcuy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "purchaseMisayWasi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "purchasePachaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_pachaUuid", type: "uint256" }],
    name: "purchaseQhatuWasi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_misayWasiUuid", type: "uint256" },
      { internalType: "uint256", name: "_amountOfTickets", type: "uint256" },
    ],
    name: "purchaseTicketFromMisayWasi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "randomNumberGenerator",
    outputs: [
      {
        internalType: "contract IRandomNumberGenerator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
      {
        internalType: "address",
        name: "_NftProducerPachacuy",
        type: "address",
      },
    ],
    name: "setNftPAddress",
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
      {
        internalType: "address",
        name: "_pachaCuyTokenAddress",
        type: "address",
      },
    ],
    name: "setPcuyTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_randomNumberGeneratorAddress",
        type: "address",
      },
    ],
    name: "setRandomNumberGeneratorAddress",
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
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_pcuyAmount", type: "uint256" },
    ],
    name: "transferPcuyFromPoolRewardToUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_pcuyAmount", type: "uint256" },
    ],
    name: "transferPcuyFromUserToPoolReward",
    outputs: [],
    stateMutability: "nonpayable",
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
