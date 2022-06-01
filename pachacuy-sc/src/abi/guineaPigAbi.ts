export default[
  "function getGuineaPigData(uint256 _uuid) view returns (bool isGuineaPig, string gender, string race, uint256 speed, uint256 daysUntilHungry, uint256 daysUntilDeath, uint256 samiPoints, uint256 uuid, uint256 idForJsonFile, uint256 feedingDate, uint256 burningDate, uint256 wasBorn, address owner)",
  "function getGuineaPigWithUuid(uint256 _guineaPigUuid) view returns (tuple(bool isGuineaPig, string race, string gender, uint256 speed, uint256 daysUntilHungry, uint256 daysUntilDeath, uint256 samiPoints, uint256 uuid, uint256 idForJsonFile, uint256 feedingDate, uint256 burningDate, uint256 wasBorn, address owner))",
  "function getListOfGuineaPigs() view returns (tuple(bool isGuineaPig, string race, string gender, uint256 speed, uint256 daysUntilHungry, uint256 daysUntilDeath, uint256 samiPoints, uint256 uuid, uint256 idForJsonFile, uint256 feedingDate, uint256 burningDate, uint256 wasBorn, address owner)[])"
]