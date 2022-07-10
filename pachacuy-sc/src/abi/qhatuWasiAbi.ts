export default[
  "event PurchaseQhatuWasi(address owner, uint256 qhatuWasiUuid, uint256 pachaUuid, uint256 qhatuWasiPrice, uint256 creationDate, uint256 balanceConsumer)",
  "event QhatuWasiCampaignStarted(uint256 campaignTax, uint256 netPcuyDeposited, uint256 samiPointsToGiveAway, uint256 qhatuWasiuuid, address owner, uint256 _prizePerView)",
  "function getListOfQhatuWasi() view returns (tuple(uint256 uuid, uint256 pachaUuid, address owner, uint256 creationDate, uint256 totalPcuyDeposited, uint256 pcuyForCurrentCampaign, uint256 samiPointsToGiveAway, uint256 qhatuWasiPrice, uint256 prizePerView)[] listOfQhatuWasis)",
  "function getQhatuWasiWithUuid(uint256 _qhatuWasiUuid) view returns (tuple(uint256 uuid, uint256 pachaUuid, address owner, uint256 creationDate, uint256 totalPcuyDeposited, uint256 pcuyForCurrentCampaign, uint256 samiPointsToGiveAway, uint256 qhatuWasiPrice, uint256 prizePerView))",
  "function startQhatuWasiCampaign(uint256 _qhatuWasiUuid, uint256 _amountPcuyCampaign, uint256 _prizePerView)"
]