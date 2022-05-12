export default [
  "function finishTatacuyCampaign(uint256 _pachaUuid) returns (uint256)",
  "function getListOfTatacuyCampaigns() view returns (tuple(address owner, uint256 tatacuyUuid, uint256 pachaUuid, uint256 creationDate, uint256 totalFundsPcuyDeposited, uint256 ratePcuyToSamiPoints, uint256 totalFundsSamiPoints, uint256 prizePerWinnerSamiPoints, uint256 totalSamiPointsClaimed, uint256 campaignStartDate, uint256 campaignEndDate, bool hasTatacuy, bool isCampaignActive)[])",
  "function getTatacuyInfoForAccount(address _account, uint256 _pachaUuid) view returns (tuple(address owner, uint256 tatacuyUuid, uint256 pachaUuid, uint256 creationDate, uint256 totalFundsPcuyDeposited, uint256 ratePcuyToSamiPoints, uint256 totalFundsSamiPoints, uint256 prizePerWinnerSamiPoints, uint256 totalSamiPointsClaimed, uint256 campaignStartDate, uint256 campaignEndDate, bool hasTatacuy, bool isCampaignActive))",
  "function startTatacuyCampaign(uint256 _pachaUuid, uint256 _tatacuyUuid, uint256 _totalFundsPcuyDeposited, uint256 _ratePcuyToSamiPoints, uint256 _totalFundsSamiPoints, uint256 _prizePerWinnerSamiPoints)"
]