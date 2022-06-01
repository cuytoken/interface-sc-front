"use strict";

import { Contract, providers } from "ethers";

// INIT
import { initBusd } from "./busd";
import { initChakra } from "./chakra";
import { initGuineaPig } from "./guineaPig";
import { initHatunWasi } from "./hatunWasi";
import { initMisayWasi } from "./misayWasi";
import { initNftProducer } from "./nftProducer";
import { initPacha } from "./pacha";
import { initPachacuyToken } from "./pachacuyToken";
import { initPurchaseAssetController } from "./purchasAssetController";
import { initqhatuWasi } from "./qhatuWasi";
import { initTatacuy } from "./tatacuy";
import { initWiracocha } from "./wiracocha";

/******************
 *     CHAKRA     *
 *****************/
export {
    getListOfChakrasWithFood,
    getChakraWithUuid,
    updateFoodPriceAtChakra,
} from "./chakra";

/******************
 *     TATACUY    *
 *****************/
export {
    signTatacuyTxAndVerify,
    finishTatacuyCampaign,
    getListOfTatacuyCampaigns,
    getTatacuyWithUuid,
    startTatacuyCampaign,
    TatacuyTryMyLuckResult,
} from "./tatacuy";

/******************
 *    WIRACOCHA   *
 *****************/
export {
    getWiracochaWithUuid,
    signWiracochaTxAndReceivePcuy,
    WiracochaExchange,
} from "./wiracocha";

/******************
 *   HATUN WASI   *
 *****************/
export { getListOfHatunWasis, getHatunWasiWithUuid } from "./hatunWasi";

/******************
 *  ROCK PAPER S  *
 *****************/
export { playRockPaperScissors } from "./rockPaperScissors";

/******************
 *     PACHA      *
 *****************/
export { getListOfPachas, getPachaWithUuid } from "./pacha";

/******************
 *   GUINEA PIG   *
 *****************/
export { getGuineaPigWithUuid, getListOfGuineaPigs } from "./guineaPig";

/******************
 *      BUSD      *
 *****************/
export { allowance, approveBusd } from "./busd";

/******************
 *  PURCHASE A C  *
 *****************/
export {
    purchaseGuineaPigWithBusd,
    purchaseGuineaPigWithPcuy,
    purchaseLandWithBusd,
    purchaseLandWithPcuy,
    purchasePachaPassWithPcuy,
    purchasePachaPassWithBusd,
    purchaseChakra,
    purchaseFoodFromChakra,
    purchaseTicketFromMisayWasi,
    purchaseMisayWasi,
    purchaseQhatuWasi,
} from "./purchasAssetController";

/******************
 *   MISAY WASI   *
 *****************/

export { startMisayWasiRaffle } from "./misayWasi";

/******************
 *  NFT PRODUCER  *
 *****************/
export {
    getGuineaPigData,
    getLandData,
    balanceOf,
    totalSupply,
    tokenURI,
    getPachaPassData,
    mintTatacuy,
    mintWiracocha,
    burnChakra,
    mintHatunWasi,
} from "./nftProducer";

/******************
 *  CONSOLIDATED  *
 *****************/
export { startQhatuWasiCampaign } from "./qhatuWasi";

/******************
 *  CONSOLIDATED  *
 *****************/
export { getListOfNftsPerAccount, getWalletData } from "./dataConsolidated";

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
    var busdContract = initBusd(_provider);
    var chakraContract = initChakra(_provider);
    var guineaPigContract = initGuineaPig(_provider);
    var hatunWasiContract = initHatunWasi(_provider);
    var misayWasiContract = initMisayWasi(_provider);
    var nftpContract = initNftProducer(_provider);
    var pacContract = initPurchaseAssetController(_provider);
    var pachaContract = initPacha(_provider);
    var pcuyContract = initPachacuyToken(_provider);
    var qhatuWasiContract = initqhatuWasi(_provider);
    var tataCuyContract = initTatacuy(_provider);
    var wiracochaContract = initWiracocha(_provider);
    return [
        nftpContract,
        pacContract,
        tataCuyContract,
        wiracochaContract,
        chakraContract,
        hatunWasiContract,
    ];
}
