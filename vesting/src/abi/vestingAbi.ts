export default[
  "function claimTokensWithUuid(uint256 _uuid)",
  "function createVestingSchema(address _account, uint256 _fundsToVest, uint256 _vestingPeriods, uint256 _releaseDay, string _roleOfAccount)",
  "function createVestingSchemaBatch(address[] _accounts, uint256[] _fundsToVestArray, uint256[] _vestingPeriods, uint256[] _releaseDays, string[] _roleOfAccounts)",
  "function getArrayVestingSchema(address _acccount) view returns (tuple(uint256 fundsToVestForThisAccount, uint256 currentVestingPeriod, uint256 totalFundsVested, uint256[] datesForVesting, string roleOfAccount, uint256 uuid, uint256 vestingPeriods, uint256 tokensPerPeriod)[] _arrayVesting)",
  "function getStatusOfFundByRole(string _roleOfAccount) view returns (tuple(string role, uint256 fundsForAllocation, uint256 fundsAllocated))",
  "function getVestingSchemaWithUuid(address _account, uint256 _uuid) view returns (uint256 fundsToVestForThisAccount, uint256 currentVestingPeriod, uint256 totalFundsVested, uint256[] datesForVesting, string roleOfAccount, uint256 uuid, uint256 vestingPeriods, uint256 tokensPerPeriod)",
  "function removesVestingSchemaForAccount(address _account, uint256 _uuid)"
]