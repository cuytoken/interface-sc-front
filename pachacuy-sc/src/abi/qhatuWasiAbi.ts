export default[
  "function getListOfQhatuWasi() view returns (tuple(uint256 uuid, address owner, uint256 creationDate, uint256 totalPcuyDeposited, uint256 pcuyForCurrentCampaign, uint256 samiPointsToGiveAway, uint256 qhatuWasiPrice)[] listOfQhatuWasis)",
  "function getQhatuWasiWithUuid(uint256 _qhatuWasiUuid) view returns (tuple(uint256 uuid, address owner, uint256 creationDate, uint256 totalPcuyDeposited, uint256 pcuyForCurrentCampaign, uint256 samiPointsToGiveAway, uint256 qhatuWasiPrice))",
  "function startQhatuWasiCampaign(uint256 _qhatuWasiUuid, uint256 _amountPcuyCampaign)"
]