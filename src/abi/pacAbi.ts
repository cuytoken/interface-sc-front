export default[
  "event GuineaPigPurchaseFinish(address _account, uint256 price, uint256 _guineaPigId, uint256 _uuid, string _raceAndGender)",
  "event GuineaPigPurchaseInit(address _account, uint256 price, uint256 _ix, address custodianWallet)",
  "event PurchaseLand(address _account, uint256 uuid, uint256 landPrice, uint256 _location, address custodianWallet)",
  "function landPrice() view returns (uint256)",
  "function purchaseGuineaPigWithBusd(uint256 _ix)",
  "function purchaseGuineaPigWithPcuy(uint256 _ix)",
  "function purchaseLandWithBusd(uint256 _location)",
  "function purchaseLandWithPcuy(uint256 _location)",
  "function purchasePachaPassWithBusd(uint256 _landUuid) returns (uint256)",
  "function purchasePachaPassWithPcuy(uint256 _landUuid) returns (uint256)"
]