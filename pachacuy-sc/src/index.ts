"use strict";

import { Contract, providers } from "ethers";

// INIT
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
 *      PCUY      *
 *****************/
export { getPachacuyBalance } from "./pachacuyToken";

/******************
 *     CHAKRA     *
 *****************/
export {
    getListOfChakrasWithFood,
    getChakraWithUuid,
    updateFoodPriceAtChakra,
    PurchaseChakra,
    burnChakra,
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
    MintTatacuy,
} from "./tatacuy";

/******************
 *    WIRACOCHA   *
 *****************/
export {
    getWiracochaWithUuid,
    signWiracochaTxAndReceivePcuy,
    WiracochaExchange,
    MintWiracocha,
} from "./wiracocha";

/******************
 *   HATUN WASI   *
 *****************/
export {
    getListOfHatunWasis,
    getHatunWasiWithUuid,
    MintHatunWasi,
} from "./hatunWasi";

/******************
 *  ROCK PAPER S  *
 *****************/
export { playRockPaperScissors } from "./rockPaperScissors";

/******************
 *     PACHA      *
 *****************/
export {
    getListOfPachas,
    getPachaWithUuid,
    setPachaToPublic,
    isPachaAlreadyTaken,
    setPachaPrivacyAndDistribution,
} from "./pacha";

/******************
 *   GUINEA PIG   *
 *****************/
export { getGuineaPigWithUuid, getListOfGuineaPigs } from "./guineaPig";

/******************
 *  PURCHASE A C  *
 *****************/
export {
    purchaseGuineaPigWithBusd,
    purchaseGuineaPigWithPcuy,
    purchaseLandWithBusd,
    purchaseLandWithPcuy,
    purchasePachaPass,
    purchaseChakra,
    purchaseFoodFromChakra,
    purchaseTicketFromMisayWasi,
    purchaseMisayWasi,
    purchaseQhatuWasi,
    PurchaseFoodChakra,
    PurchaseLand,
    PurchasePachaPass,
    PurchaseTicket,
    GuineaPigPurchaseFinish,
} from "./purchasAssetController";

/******************
 *   MISAY WASI   *
 *****************/

export {
    startMisayWasiRaffle,
    getMisayWasiWithUuid,
    getMiswayWasiWithTicketUuid,
    getListOfActiveMWRaffles,
    getListOfMisayWasisReadyToRaffle,
    PurchaseTicketFromMisayWasi,
    PurchaseMisayWasi,
    getHistoricWinners,
} from "./misayWasi";

/******************
 *  NFT PRODUCER  *
 *****************/
export {
    getGuineaPigData,
    getLandData,
    balanceOf,
    totalSupply,
    tokenURI,
    mintTatacuy,
    mintWiracocha,
    mintHatunWasi,
    isGuineaPigAllowedInPacha,
    mintPachaPassAsOwner,
} from "./nftProducer";

/******************
 *  QHATU WASI  *
 *****************/
export {
    startQhatuWasiCampaign,
    getQhatuWasiWithUuid,
    PurchaseQhatuWasi,
} from "./qhatuWasi";

/******************
 *  CONSOLIDATED  *
 *****************/
export {
    getListOfNftsPerAccount,
    getWalletData,
    getComponentsInPacha,
} from "./dataConsolidated";

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
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
        misayWasiContract,
        qhatuWasiContract,
    ];
}
