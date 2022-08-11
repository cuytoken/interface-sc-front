"use strict";

import { Contract, providers, utils } from "ethers";

import { initVesting } from "./vesting";

/******************
 *     VESTING    *
 *****************/
export {
    claimTokensWithUuid,
    createVestingSchema,
    createVestingSchemaBatch,
    getArrayVestingSchema,
    getStatusOfFundByRole,
    getVestingSchemaWithUuid,
    removesVestingSchemaForAccount,
} from "./vesting";

/******************
 *     NETWORK    *
 *****************/
export { connectToMumbai } from "./network";

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract {
    var vestingContract = initVesting(_provider);
    return vestingContract;
}
