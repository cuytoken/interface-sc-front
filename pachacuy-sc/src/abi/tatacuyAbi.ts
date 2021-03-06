export default[
  "event FinishTatacuyCampaign(address tatacuyOwner, uint256 totalSamiPoints, uint256 samiPointsClaimed, uint256 changeSamiPoints)",
  "event MintTatacuy(address owner, uint256 tatacuyUuid, uint256 pachaUuid, uint256 creationDate)",
  "event TatacuyTryMyLuckResult(address account, bool hasWon, uint256 prizeWinner, uint256 likelihood, uint256 pachaUuid, uint256 tatacuyUuid, address pachaOwner, uint256 idFromFront)",
  "function finishTatacuyCampaign(uint256 _tatacuyUuid)",
  "function getListOfTatacuyCampaigns() view returns (tuple(address owner, uint256 tatacuyUuid, uint256 pachaUuid, uint256 creationDate, uint256 totalFundsPcuyDeposited, uint256 ratePcuyToSamiPoints, uint256 totalFundsSamiPoints, uint256 prizePerWinnerSamiPoints, uint256 totalSamiPointsClaimed, uint256 campaignStartDate, uint256 campaignEndDate, bool hasTatacuy, bool isCampaignActive)[] listActiveCampaigns)",
  "function getTatacuyWithUuid(uint256 _tatacuyUuid) view returns (tuple(address owner, uint256 tatacuyUuid, uint256 pachaUuid, uint256 creationDate, uint256 totalFundsPcuyDeposited, uint256 ratePcuyToSamiPoints, uint256 totalFundsSamiPoints, uint256 prizePerWinnerSamiPoints, uint256 totalSamiPointsClaimed, uint256 campaignStartDate, uint256 campaignEndDate, bool hasTatacuy, bool isCampaignActive))",
  "function startTatacuyCampaign(uint256 _tatacuyUuid, uint256 _totalFundsPcuyDeposited, uint256 _prizePerWinnerPcuy)",
  "function tryMyLuckTatacuy(address _account, uint256 _likelihood, uint256 _idFromFront, uint256 _tatacuyUuid)"
]