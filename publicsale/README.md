**CHANGELOGS**

<u>0.0.1</u>
Methods for front:

- claimTokensWithUuid
- getArrayVestingSchema
- getVestingSchemaWithUuid
- getStatusOfFundByRole
- connectToMumbai

```js
/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export declare function initVesting(
    _provider: providers.ExternalProvider
): Contract;
/**
 * @notice Claim tokens for a wallet address by using the uuid of the vesting schedule
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _uuid: Unique identifier created when for the vesting schedule
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function claimTokensWithUuid(
    _signer: Signer,
    _uuid: number,
    _numberOfConfirmations?: number
): Promise<any>;
/**
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _account: Wallet address who will receive a vesting schedule
 * @param _fundsToVest: Amount of tokens to be given to _account as part of the vesting schedule
 * @param _vestingPeriods: AMount of vesting periods within the vesting schedule
 * @param _releaseDay: Timestamp from which 30 days later the vesting schedule will be released
 * @param _roleOfAccount: Indicates one the following roles available: HOLDER_CUY_TOKEN | PRIVATE_SALE_1 | PRIVATE_SALE_2 | PACHACUY_TEAM | PARTNER_ADVISOR | MARKETING | AIRDROP
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function createVestingSchema(
    _signer: Signer,
    _account: string,
    _fundsToVest: number,
    _vestingPeriods: number,
    _releaseDay: number,
    _roleOfAccount: string,
    _numberOfConfirmations?: number
): Promise<any>;
/**
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _accountArray: Array of wallet addresses who will receive a vesting schedule
 * @param _fundsToVestArray: Array of Amount of tokens to be given to _account as part of the vesting schedule
 * @param _vestingPeriodsArray: Array of amount of vesting periods within the vesting schedule
 * @param _releaseDayArray: Array of timestamps from which 30 days later the vesting schedule will be released
 * @param _roleOfAccountArray: Array of roles. Available roles: HOLDER_CUY_TOKEN | PRIVATE_SALE_1 | PRIVATE_SALE_2 | PACHACUY_TEAM | PARTNER_ADVISOR | MARKETING | AIRDROP
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function createVestingSchemaBatch(
    _signer: Signer,
    _accountArray: string[],
    _fundsToVestArray: number[],
    _vestingPeriodsArray: number[],
    _releaseDayArray: number[],
    _roleOfAccountArray: string[],
    _numberOfConfirmations?: number
): Promise<any>;
/**
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _account: Wallet address who will receive a vesting schedule
 * @param _uuid: Unique identifier of the vesting schedule created for this account
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function removesVestingSchemaForAccount(
    _signer: Signer,
    _account: string,
    _uuid: number,
    _numberOfConfirmations?: number
): Promise<any>;
/**
 * @param fundsToVestForThisAccount: Total amount of tokens for vesting for this account
 * @param currentVestingPeriod: Current month of the vesting schedule (starts at 0)
 * @param totalFundsVested: Amount of tokens claimed so far
 * @param datesForVesting: Array of dates after which the vesting tokens are claimable
 * @param roleOfAccount: One of the vesting roles: HOLDER_CUY_TOKEN | PRIVATE_SALE_1 | PRIVATE_SALE_2 | PACHACUY_TEAM | PARTNER_ADVISOR | MARKETING | AIRDROP
 * @param uuid: Unique identifier of the vesting schedule created for this account
 * @param vestingPeriods: Amount of months or vesting periods within the vesting schedule
 * @param tokensPerPeriod: Amount of tokens to be given to the account per vesting period
 */
interface VestingPerAccount {
    fundsToVestForThisAccount: string;
    currentVestingPeriod: number;
    totalFundsVested: string;
    datesForVesting: string[];
    roleOfAccount: string;
    uuid: string;
    vestingPeriods: number;
    tokensPerPeriod: string;
}
/**
 * @notice Gets the list of vesting schedules for an account
 * @param _account: Wallet address for which the schedules are consulted
 */
export declare function getArrayVestingSchema(
    _account: string
): Promise<VestingPerAccount[]>;
/**
 * @notice Gets the a vesting schedule for an account by using the unique identifier of the vesting
 * @param _uuid: Unique identifier of the vesting schedule created for this account
 */
export declare function getVestingSchemaWithUuid(
    _uuid: number
): Promise<VestingPerAccount>;
/**
 * ROLES FOR VESTING       Q(M)
 * -----
 * HOLDER_CUY_TOKEN     -> 1
 * PRIVATE_SALE_1       -> 1.5
 * PRIVATE_SALE_2       -> 0.6
 * AIRDROP              -> 1.2
 * PACHACUY_TEAM        -> 12
 * PARTNER_ADVISOR      -> 10
 * MARKETING            -> 10
 * ------------------------------------
 * TOTAL                -> 36.3
 *
 * @param _role: Indicates one the following roles available: HOLDER_CUY_TOKEN | PRIVATE_SALE_1 | PRIVATE_SALE_2 | PACHACUY_TEAM | PARTNER_ADVISOR | MARKETING | AIRDROP
 * @param fundsForAllocation: Total amount of tokens to be given for this role as vesting
 * @param fundsAllocated: Total amount of tokens assigned to all wallets for this role
 */
interface Fund {
    role: string;
    fundsForAllocation: string;
    fundsAllocated: string;
}
/**
 * @notice Gets the status of funds used and allocated for a particular role
 * @param _role: Indicates one the following roles available: HOLDER_CUY_TOKEN | PRIVATE_SALE_1 | PRIVATE_SALE_2 | PACHACUY_TEAM | PARTNER_ADVISOR | MARKETING | AIRDROP
 */
export declare function getStatusOfFundByRole(_role: string): Promise<Fund>;

```
