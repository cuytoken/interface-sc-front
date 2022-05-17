export default[
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event URI(string value, uint256 indexed id)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
  "function burnChakra(uint256 _chakraUuid)",
  "function exists(uint256 id) view returns (bool)",
  "function getGuineaPigData(uint256 _uuid) view returns (bool isGuineaPig, string gender, string race, uint256 speed, uint256 daysUntilHungry, uint256 daysUntilDeath, uint256 samiPoints, uint256 uuid, uint256 idForJsonFile, uint256 feedingDate, uint256 burningDate, uint256 wasBorn, address owner)",
  "function getLandData(uint256 _uuid) view returns (bool isLand, bool isPublic, uint256 uuid, uint256 pachaPassUuid, uint256 pachaPassPrice, uint256 typeOfDistribution, uint256 location, uint256 idForJsonFile, uint256 wasPurchased, address owner)",
  "function getListOfNftsPerAccount(address _account) view returns (uint256[] guineaPigs, uint256[] lands, uint256[] pachaPasses)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function isGuineaPigAllowedInPacha(address _account, uint256 _landUuid) view returns (bool)",
  "function mintHatunWasi(uint256 _pachaUuid) returns (uint256)",
  "function mintTatacuy(uint256 _pachaUuid) returns (uint256)",
  "function mintWiracocha(uint256 _pachaUuid) returns (uint256)",
  "function tokenURI(uint256 _uuid) view returns (string)",
  "function totalSupply(uint256 id) view returns (uint256)",
  "function uri(uint256 _uuid) view returns (string)"
]