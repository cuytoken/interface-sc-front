import { BigNumber, utils, Contract, ethers, providers, Signer } from "ethers";

/******************
 *     GETTERS    *
 *****************/
import { getChakraWithUuid, ChakraInfo } from "./chakra";
import { getGuineaPigWithUuid, IGuineaPigInfo } from "./guineaPig";
import { getHatunWasiWithUuid, IHatunWasiInfo } from "./hatunWasi";
import {
    getMisayWasiWithUuid,
    getMiswayWasiWithTicketUuid,
    IMisayWasiInfo,
} from "./misayWasi";
import { getPachaWithUuid, PachaInfo } from "./pacha";
import { getQhatuWasiWithUuid, QhatuWasiInfo } from "./qhatuWasi";
import { getTatacuyWithUuid, ITatacuyCampaign } from "./tatacuy";
import { getWiracochaWithUuid, WiracochaInfo } from "./wiracocha";

import { nftpContract } from "./nftProducer";
import { pcuyContract } from "./pachacuyToken";

var keccak256 = ethers.utils.keccak256;
var toUtf8Bytes = ethers.utils.toUtf8Bytes;
// types of businesses
var CHAKRA = keccak256(toUtf8Bytes("CHAKRA"));
var GUINEAPIG = keccak256(toUtf8Bytes("GUINEAPIG"));
var HATUNWASI = keccak256(toUtf8Bytes("HATUNWASI"));
var MISAYWASI = keccak256(toUtf8Bytes("MISAYWASI"));
var PACHA = keccak256(toUtf8Bytes("PACHA"));
var QHATUWASI = keccak256(toUtf8Bytes("QHATUWASI"));
var TATACUY = keccak256(toUtf8Bytes("TATACUY"));
var TICKETRAFFLE = keccak256(toUtf8Bytes("TICKETRAFFLE"));
var WIRACOCHA = keccak256(toUtf8Bytes("WIRACOCHA"));

interface IBusiness {
    type: string;
    method: Function;
    promises: any;
}

var businesses: IBusiness[] = [
    { type: CHAKRA, method: getChakraWithUuid, promises: [] },
    { type: GUINEAPIG, method: getGuineaPigWithUuid, promises: [] },
    { type: HATUNWASI, method: getHatunWasiWithUuid, promises: [] },
    { type: MISAYWASI, method: getMisayWasiWithUuid, promises: [] },
    { type: PACHA, method: getPachaWithUuid, promises: [] },
    { type: QHATUWASI, method: getQhatuWasiWithUuid, promises: [] },
    { type: TATACUY, method: getTatacuyWithUuid, promises: [] },
    { type: TICKETRAFFLE, method: getMiswayWasiWithTicketUuid, promises: [] },
    { type: WIRACOCHA, method: getWiracochaWithUuid, promises: [] },
];
/**
 * @param guineaPigs: list of uuids of each guinea pig owned by the user
 * @param lands: list of uuids of each land owned by the user
 * @param pachaPasses: list of uuids of each pacha pass owned by the user
 */
interface NftList {
    chakra: ChakraInfo[];
    guineaPig: IGuineaPigInfo[];
    hatunWasi: IHatunWasiInfo[];
    misayWasi: IMisayWasiInfo[];
    pacha: PachaInfo[];
    qhatuWasi: QhatuWasiInfo[];
    tatacuy: ITatacuyCampaign[];
    ticketRaffle: IMisayWasiInfo[];
    wiracocha: WiracochaInfo[];
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Wallet address of the user
 * @return Lists of NFTs owned by the user
 */
export async function getListOfNftsPerAccount(
    _account: string
): Promise<NftList> {
    var { _listOfUuids, _listOfTypes } =
        await nftpContract.getListOfUuidsPerAccount(_account);

    businesses.forEach(({ type, method, promises }, ix) => {
        var tempUuids = _listOfUuids.filter(
            (_: string, ix: number) => _listOfTypes[ix] == type
        );
        promises.push(...tempUuids.map((uuid: number) => method(uuid)));
    });

    var chakra = await Promise.all([...businesses[0].promises]);
    var guineaPig = await Promise.all([...businesses[1].promises]);
    var hatunWasi = await Promise.all([...businesses[2].promises]);
    var misayWasi = await Promise.all([...businesses[3].promises]);
    var pacha = await Promise.all([...businesses[4].promises]);
    var qhatuWasi = await Promise.all([...businesses[5].promises]);
    var tatacuy = await Promise.all([...businesses[6].promises]);
    var ticketRaffle = await Promise.all([...businesses[7].promises]);
    var wiracocha = await Promise.all([...businesses[8].promises]);

    return {
        chakra,
        guineaPig,
        hatunWasi,
        misayWasi,
        pacha,
        qhatuWasi,
        tatacuy,
        ticketRaffle,
        wiracocha,
    };
}

/**
 * @param guineaPigs array of uuid for each Puinea Pig.
 * @param lands array of uuid for each Pacha.
 * @param pachaPasses array of uuid for each Pacha Pass.
 * @param tokenBalance shows the balance of Pacha Cuy tokens for this wallet
 */
interface IWalletInfo {
    chakra: number[];
    guineaPig: number[];
    hatunWasi: number[];
    misayWasi: number[];
    pacha: number[];
    qhatuWasi: number[];
    tatacuy: number[];
    ticketRaffle: number[];
    wiracocha: number[];
    tokenBalance: string;
}

/**
 *
 * @param _account: Wallet address of the user
 * @returns Returns a type of IWalletInfo that contains information about the wallee of the player
 */
export async function getWalletData(_account: string): Promise<IWalletInfo> {
    var { _listOfUuids, _listOfTypes } =
        await nftpContract.getListOfUuidsPerAccount(_account);

    var uuidsArray = Array(businesses.length)
        .fill(null)
        .map(() => []);
    businesses.forEach(({ type }, ix) => {
        var tempUuids = _listOfUuids.filter(
            (_: string, i: number) => _listOfTypes[i] == type
        );
        tempUuids = tempUuids.map((el: BigNumber) => el.toString());
        uuidsArray[ix].push(...tempUuids);
    });

    var tokenBalance = utils.formatEther(await pcuyContract.balanceOf(_account));

    var chakra = uuidsArray[0];
    var guineaPig = uuidsArray[1];
    var hatunWasi = uuidsArray[2];
    var misayWasi = uuidsArray[3];
    var pacha = uuidsArray[4];
    var qhatuWasi = uuidsArray[5];
    var tatacuy = uuidsArray[6];
    var ticketRaffle = uuidsArray[7];
    var wiracocha = uuidsArray[8];

    return {
        chakra,
        guineaPig,
        hatunWasi,
        misayWasi,
        pacha,
        qhatuWasi,
        tatacuy,
        ticketRaffle,
        wiracocha,
        tokenBalance,
    };
}
