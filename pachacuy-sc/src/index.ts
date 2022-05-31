"use strict";

import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

// INIT
import { initTatacuy } from "./tatacuy";
import { initWiracocha } from "./wiracocha";
import { initChakra } from "./chakra";
import { initHatunWasi } from "./hatunWasi";
import { initGuineaPig } from "./guineaPig";
import { initMisayWasi } from "./misayWasi";
import { initBusd } from "./busd";
import { initPurchaseAssetController } from "./purchasAssetController";
import { initNftProducer } from "./nftProducer";
import { initPachacuyToken } from "./pachacuyToken";

export {
    getListOfChakrasWithFood,
    getChakraWithUuid,
    updateFoodPriceAtChakra,
} from "./chakra";
export {
    signTatacuyTxAndVerify,
    finishTatacuyCampaign,
    getListOfTatacuyCampaigns,
    getTatacuyInfoForAccount,
    startTatacuyCampaign,
    TatacuyTryMyLuckResult,
} from "./tatacuy";
export {
    getWiracochaInfoForAccount,
    signWiracochaTxAndReceivePcuy,
    WiracochaExchange,
} from "./wiracocha";
export { getListOfHatunWasis, getAHatunWasi } from "./hatunWasi";
export { playRockPaperScissors } from "./rockPaperScissors";
export { getListOfPachas, getPachaWithUuid } from "./pacha";
export { getGuineaPigWithUuid, getListOfGuineaPigs } from "./guineaPig";
export { allowance, approveBusd } from "./busd"
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
} from "./purchasAssetController"
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


var provider: providers.Web3Provider = null;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
    var tataCuyContract = initTatacuy(_provider);
    var wiracochaContract = initWiracocha(_provider);
    var chakraContract = initChakra(_provider);
    var hatunWasiContract = initHatunWasi(_provider);
    var pacContract = initPurchaseAssetController(_provider);
    var nftpContract = initNftProducer(_provider);
    var pcuyContract = initPachacuyToken(_provider);
    initBusd(_provider);
    initGuineaPig(_provider);
    initMisayWasi(_provider);
    provider = new providers.Web3Provider(_provider);
    return [
        nftpContract,
        pacContract,
        tataCuyContract,
        wiracochaContract,
        chakraContract,
        hatunWasiContract,
    ];
}


////////////////////////
///    Misay Wasi    ///
////////////////////////


