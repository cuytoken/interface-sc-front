export default[
  "function getListOfPachaPasses() view returns (tuple(bool isPachaPass, uint256 pachaUuid, uint256 typeOfDistribution, uint256 uuid, uint256 price, string transferMode, address[] listPachaPassOwners)[] listOfPachaPasses)",
  "function getListOfPachas() view returns (tuple(bool isPacha, bool isPublic, uint256 uuid, uint256 pachaPassUuid, uint256 pachaPassPrice, uint256 typeOfDistribution, uint256 idForJsonFile, uint256 wasPurchased, uint256 location, address owner, uint256 price, address[] listPachaPassOwners)[] listOfPachas)",
  "function getPachaPassWithUuid(uint256 _pachaPassUuid) view returns (tuple(bool isPachaPass, uint256 pachaUuid, uint256 typeOfDistribution, uint256 uuid, uint256 price, string transferMode, address[] listPachaPassOwners))",
  "function getPachaWithUuid(uint256 _pachaUuid) view returns (tuple(bool isPacha, bool isPublic, uint256 uuid, uint256 pachaPassUuid, uint256 pachaPassPrice, uint256 typeOfDistribution, uint256 idForJsonFile, uint256 wasPurchased, uint256 location, address owner, uint256 price, address[] listPachaPassOwners))",
  "function isPachaAlreadyTaken(uint256 _location) view returns (bool)",
  "function setPachaPrivacyAndDistribution(uint256 _pachaUuid, uint256 _price, uint256 _typeOfDistribution)",
  "function setPachaToPublic(uint256 _pachaUuid)"
]