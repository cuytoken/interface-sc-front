export default[
  "event GuineaPigPurchaseFinish(address _account, uint256 price, uint256 _guineaPigId, uint256 _uuid, string _raceAndGender, uint256 balanceConsumer)",
  "event PurchaseFoodChakra(uint256 chakraUuid, uint256 amountOfFood, uint256 availableFood, address chakraOwner, uint256 pcuyReceived, uint256 pcuyTaxed, uint256 tax, uint256 balanceOwner, uint256 balanceConsumer)",
  "event PurchaseLand(address _account, uint256 uuid, uint256 landPrice, uint256 _location, address poolRewardsAddress, uint256 balanceConsumer)",
  "event PurchasePachaPass(address account, address pachaOwner, uint256 pachaUuid, uint256 pachaPassUuid, uint256 price, uint256 pcuyReceived, uint256 pcuyTaxed, uint256 balanceOwner, uint256 balanceConsumer)",
  "event PurchaseTicket(address misayWasiOwner, uint256 misayWasiUuid, uint256 ticketUuid, uint256 balanceOwner, uint256 balanceConsumer)",
  "function purchaseChakra(uint256 _pachaUuid) returns (uint256 chakraUuid)",
  "function purchaseFoodFromChakra(uint256 _chakraUuid, uint256 _amountFood, uint256 _guineaPigUuid)",
  "function purchaseGuineaPigWithBusd(uint256 _ix)",
  "function purchaseGuineaPigWithPcuy(uint256 _ix)",
  "function purchaseLandWithBusd(uint256 _location)",
  "function purchaseLandWithPcuy(uint256 _location)",
  "function purchaseMisayWasi(uint256 _pachaUuid)",
  "function purchasePachaPass(uint256 _pachaUuid)",
  "function purchaseQhatuWasi(uint256 _pachaUuid)",
  "function purchaseTicketFromMisayWasi(uint256 _misayWasiUuid, uint256 _amountOfTickets)"
]