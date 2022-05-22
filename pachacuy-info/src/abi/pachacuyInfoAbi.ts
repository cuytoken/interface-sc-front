export default [
  "event BoxesPerDayPerPachaDx(uint256 previousAmount, uint256 newAmount)",
  "event ExchangeRateBusdToPcuyDx(uint256 previousAmount, uint256 amount)",
  "event ExchangeRatePcuyToSamiDx(uint256 previousAmount, uint256 amount)",
  "event InfoByRankUpdated(uint256 rank, uint256 maxSamiPoints, uint256 boxes, uint256 affectation)",
  "event MaximumSamiPointsDx(uint256 previousAmount, uint256 newAmount)",
  "event MinimumSamiPointsDx(uint256 previousAmount, uint256 newAmount)",
  "function convertBusdToPcuy(uint256 _busdAmount) view returns (uint256 _pacuyAmount)",
  "function convertPcuyToSami(uint256 _pcuyAmount) view returns (uint256 _samiPoints)",
  "function convertSamiToPcuy(uint256 _samiAmount) view returns (uint256 _pcuyAmount)",
  "function exchangeRateBusdToPcuy() view returns (uint256)",
  "function exchangeRatePcuyToSami() view returns (uint256)",
  "function getAllGameInformation() view returns (tuple(uint256 maxSamiPoints, uint256 boxes, uint256 affectation)[] _infoArrayBasedOnRank, uint256 _amountOfBoxesPerPachaPerDay, uint256 _amountOfMinimumSamiPoints, uint256 _amountOfMaximumSamiPoints, uint256 _exchangeRatePcuyToSami)",
  "function getInformationByRank(uint256 _rank) view returns (tuple(uint256 maxSamiPoints, uint256 boxes, uint256 affectation))",
  "function chakraPrice() view returns (uint256)",
  "function misayWasiPrice() view returns (uint256)",
  "function pachaPrice() view returns (uint256)",
  "function qhatuWasiPrice() view returns (uint256)"
]