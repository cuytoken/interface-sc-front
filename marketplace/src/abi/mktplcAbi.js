export default [
  "function changePriceOfNft(address _smartContractAddress, uint256 _uuid, uint256 _newPrice)",
  "function getListOfNftsForSale() view returns (tuple(address nftOwner, address smartContract, uint256 uuid, uint256 price, bool listed)[])",
  "function isMarketPlaceAllowed(address _scToVerify, address _account) view returns (bool)",
  "function purchaseNftWithBusd(address _smartContractAddress, uint256 _uuid)",
  "function purchaseNftWithPcuy(address _smartContractAddress, uint256 _uuid)",
  "function setPriceAndListAsset(address _smartContractAddress, uint256 _uuid, uint256 _price)",
  "function removeItemFromMarketplace(address _smartContractAddress, uint256 _uuid)",
];
