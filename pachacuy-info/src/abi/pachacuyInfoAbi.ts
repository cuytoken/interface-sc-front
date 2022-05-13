export default[
  "event BoxesPerDayPerPachaDx(uint256 previousAmount, uint256 newAmount)",
  "event InfoByRankUpdated(uint256 rank, uint256 maxSamiPoints, uint256 boxes, uint256 affectation)",
  "event MaximumSamiPointsDx(uint256 previousAmount, uint256 newAmount)",
  "event MinimumSamiPointsDx(uint256 previousAmount, uint256 newAmount)",
  "function getAllGameInformation() view returns (tuple(uint256 maxSamiPoints, uint256 boxes, uint256 affectation)[] _infoArrayBasedOnRank, uint256 _amountOfBoxesPerPachaPerDay, uint256 _amountOfMinimumSamiPoints, uint256 _amountOfMaximumSamiPoints, uint256 _exchangeRateBusdToPcuy)",
  "function getExchangeRateBusdToPcuy() view returns (uint256)",
  "function getInformationByRank(uint256 _rank) view returns (tuple(uint256 maxSamiPoints, uint256 boxes, uint256 affectation))"
]