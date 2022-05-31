export default[
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event URI(string value, uint256 indexed id)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
  "function burnChakra(uint256 _chakraUuid)",
  "function exists(uint256 id) view returns (bool)",
  "function getListOfUuidsPerAccount(address _account) view returns (uint256[] _listOfUuids, bytes32[] _listOfTypes)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function mintHatunWasi(uint256 _pachaUuid) returns (uint256)",
  "function mintTatacuy(uint256 _pachaUuid) returns (uint256)",
  "function mintWiracocha(uint256 _pachaUuid) returns (uint256)",
  "function tokenURI(uint256 _uuid) view returns (string)",
  "function totalSupply(uint256 id) view returns (uint256)",
  "function uri(uint256 _uuid) view returns (string)"
]