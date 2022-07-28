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
import {
    getPachaWithUuid,
    PachaInfo,
    getPachaPassWithUuid,
    PachaPassInfo,
} from "./pacha";
import { getQhatuWasiWithUuid, QhatuWasiInfo } from "./qhatuWasi";
import { getTatacuyWithUuid, ITatacuyCampaign } from "./tatacuy";
import { getWiracochaWithUuid, WiracochaInfo } from "./wiracocha";

import { nftpContract, getListOfUuidsPerAccount } from "./nftProducer";
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
var PACHAPASS = keccak256(toUtf8Bytes("PACHAPASS"));
var BURNED = keccak256(toUtf8Bytes("BURNED"));

interface IBusiness {
    type: string;
    method: Function;
}

var businesses: IBusiness[] = [
    { type: CHAKRA, method: getChakraWithUuid },
    { type: GUINEAPIG, method: getGuineaPigWithUuid },
    { type: HATUNWASI, method: getHatunWasiWithUuid },
    { type: MISAYWASI, method: getMisayWasiWithUuid },
    { type: PACHA, method: getPachaWithUuid },
    { type: QHATUWASI, method: getQhatuWasiWithUuid },
    { type: TATACUY, method: getTatacuyWithUuid },
    { type: TICKETRAFFLE, method: getMiswayWasiWithTicketUuid },
    { type: WIRACOCHA, method: getWiracochaWithUuid },
    { type: PACHAPASS, method: getPachaPassWithUuid },
    { type: BURNED, method: () => { } },
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
    pachapass: PachaPassInfo[];
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Wallet address of the user
 * @return Lists of NFTs owned by the user
 */
export async function getListOfNftsPerAccount(
    _account: string
): Promise<NftList> {
    try {
        var { _listOfUuids, _listOfTypes } = await getListOfUuidsPerAccount(
            _account
        );
    } catch (error) {
        console.log("dataConsolidated error", error);
    }

    var promisesArray = Array(businesses.length)
        .fill(null)
        .map(() => []);
    businesses.forEach(({ type, method }, ix) => {
        var tempUuids = _listOfUuids.filter(
            (_: string, i: number) => _listOfTypes[i] == type
        );
        promisesArray[ix].push(...tempUuids.map((uuid: number) => method(uuid)));
    });

    var chakra = await Promise.all([...promisesArray[0]]);
    var guineaPig = await Promise.all([...promisesArray[1]]);
    var hatunWasi = await Promise.all([...promisesArray[2]]);
    var misayWasi = await Promise.all([...promisesArray[3]]);
    var pacha = await Promise.all([...promisesArray[4]]);
    var qhatuWasi = await Promise.all([...promisesArray[5]]);
    var tatacuy = await Promise.all([...promisesArray[6]]);
    var ticketRaffle = await Promise.all([...promisesArray[7]]);
    var wiracocha = await Promise.all([...promisesArray[8]]);
    var pachapass = await Promise.all([...promisesArray[9]]);

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
        pachapass,
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
    pachapass: number[];
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
    var pachapass = uuidsArray[9];

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
        pachapass,
        tokenBalance,
    };
}

interface ComponentsInPacha {
    chakra: ChakraInfo[];
    hatunWasi: IHatunWasiInfo[];
    misayWasi: IMisayWasiInfo[];
    qhatuWasi: QhatuWasiInfo[];
    tatacuy: ITatacuyCampaign[];
    wiracocha: WiracochaInfo[];
}

/**
 * 
 * @param uuid Pacha Uuid
 * @returns ComponentsInPacha
 */
export async function getComponentsInPacha(
    uuid: number
): Promise<ComponentsInPacha | {}> {
    var { isPacha, owner } = await getPachaWithUuid(uuid);
    if (!isPacha) return {};
    var { chakra, hatunWasi, misayWasi, qhatuWasi, tatacuy, wiracocha } =
        await getListOfNftsPerAccount(owner);
    chakra = chakra.filter(({ pachaUuid }) => pachaUuid == uuid);
    hatunWasi = hatunWasi.filter(({ pachaUuid }) => pachaUuid == uuid);
    misayWasi = misayWasi.filter(({ pachaUuid }) => pachaUuid == uuid);
    // qhatuWasi = qhatuWasi.filter(({ pachaUuid }) => pachaUuid == uuid);
    tatacuy = tatacuy.filter(({ pachaUuid }) => pachaUuid == uuid);
    wiracocha = wiracocha.filter(({ pachaUuid }) => pachaUuid == uuid);
    return {
        chakra,
        hatunWasi,
        misayWasi,
        qhatuWasi,
        tatacuy,
        wiracocha,
    };
}
