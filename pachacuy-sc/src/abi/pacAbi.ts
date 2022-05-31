export default[
  "event GuineaPigPurchaseFinish(address _account, uint256 price, uint256 _guineaPigId, uint256 _uuid, string _raceAndGender)",
  "event GuineaPigPurchaseInit(address _account, uint256 price, uint256 _ix, address poolRewardsAddress)",
  "event PurchaseLand(address _account, uint256 uuid, uint256 landPrice, uint256 _location, address poolRewardsAddress)",
  "function purchaseChakra(uint256 _pachaUuid) returns (uint256 chakraUuid)",
  "function purchaseFoodFromChakra(uint256 _chakraUuid, uint256 _amountFood, uint256 _guineaPigUuid)",
  "function purchaseGuineaPigWithBusd(uint256 _ix)",
  "function purchaseGuineaPigWithPcuy(uint256 _ix)",
  "function purchaseLandWithBusd(uint256 _location)",
  "function purchaseLandWithPcuy(uint256 _location)",
  "function purchaseMisayWasi(uint256 _pachaUuid)",
  "function purchasePachaPassWithBusd(uint256 _landUuid) returns (uint256)",
  "function purchasePachaPassWithPcuy(uint256 _landUuid) returns (uint256)",
  "function purchaseQhatuWasi(uint256 _pachaUuid)",
  "function purchaseTicketFromMisayWasi(uint256 _misayWasiUuid, uint256 _amountOfTickets)"
]