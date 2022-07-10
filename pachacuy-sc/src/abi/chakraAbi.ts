export default[
  "event PurchaseChakra(address owner, uint256 chakraUuid, uint256 pachaUuid, uint256 chakraPrice, uint256 creationDate, uint256 balanceConsumer)",
  "function getChakraWithUuid(uint256 _chakraUuid) view returns (tuple(address owner, uint256 chakraUuid, uint256 pachaUuid, uint256 creationDate, uint256 priceOfChakra, uint256 pricePerFood, uint256 totalFood, uint256 availableFood, bool hasChakra))",
  "function getListOfChakrasWithFood() view returns (tuple(address owner, uint256 chakraUuid, uint256 pachaUuid, uint256 creationDate, uint256 priceOfChakra, uint256 pricePerFood, uint256 totalFood, uint256 availableFood, bool hasChakra)[])",
  "function updateFoodPriceAtChakra(uint256 _chakraUuid, uint256 _pricePerFood)"
]