"use strict";

import { Contract, providers } from "ethers";

import { initPublicSale } from "./publicSale";
import { initUsdc } from "./usdc";

export {
    purchasePcuyWithUsdc,
    exchangeRateUsdcToPcuy,
    totalPcuySold,
    totalPcuyVesting,
    totalUsdcRaised,
    walletForFunds,
} from "./publicSale";

export { approve, allowance, balanceOf } from "./usdc";

/******************
 *     NETWORK    *
 *****************/
export { connectToMumbai } from "./network";

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
    var vestingContract = initPublicSale(_provider);
    var usdcContract = initUsdc(_provider);
    return [vestingContract, usdcContract];
}
