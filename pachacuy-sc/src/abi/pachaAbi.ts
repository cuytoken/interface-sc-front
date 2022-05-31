export default[
  "function getListOfPachas() view returns (tuple(bool isPacha, bool isPublic, uint256 uuid, uint256 pachaPassUuid, uint256 pachaPassPrice, uint256 typeOfDistribution, uint256 idForJsonFile, uint256 wasPurchased, uint256 location, address owner)[] listOfPachas)",
  "function getPachaWithUuid(uint256 _pachaUuid) view returns (tuple(bool isPacha, bool isPublic, uint256 uuid, uint256 pachaPassUuid, uint256 pachaPassPrice, uint256 typeOfDistribution, uint256 idForJsonFile, uint256 wasPurchased, uint256 location, address owner))",
  "function isPachaAlreadyTaken(uint256 _location) view returns (bool)"
]