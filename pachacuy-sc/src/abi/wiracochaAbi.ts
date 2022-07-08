export default[
  "event MintWiracocha(address owner, uint256 wiracochaUuid, uint256 pachaUuid, uint256 creationDate)",
  "event WiracochaExchange(address exchanger, address pachaOwner, uint256 pachaUuid, uint256 amountPcuy, uint256 totalPcuyBalance, uint256 samiPoints, uint256 ratePcuyToSami, uint256 idFromFront)",
  "function exchangeSamiToPcuy(address _exchanger, uint256 _samiPoints, uint256 _idFromFront, uint256 _wiracochaUuid)",
  "function getListOfWiracochas() view returns (tuple(address owner, uint256 wiracochaUuid, uint256 pachaUuid, uint256 creationDate, uint256 amountPcuyExchanged, bool hasWiracocha)[] listOfWiracochas)",
  "function getWiracochaWithUuid(uint256 _wiracochaUuid) view returns (tuple(address owner, uint256 wiracochaUuid, uint256 pachaUuid, uint256 creationDate, uint256 amountPcuyExchanged, bool hasWiracocha))"
]