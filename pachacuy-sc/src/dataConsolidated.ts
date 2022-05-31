import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

import { nftpContract } from "./nftProducer";
import { pcuyContract } from "./pachacuyToken";

// types of businesses
var TATACUY = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("TATACUY"));
var WIRACOCHA = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("WIRACOCHA"));
var CHAKRA = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CHAKRA"));
var HATUNWASI = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("HATUNWASI"));

////////////////////////
///     NFT DATA     ///
////////////////////////
/**
 * @param guineaPigs: list of uuids of each guinea pig owned by the user
 * @param lands: list of uuids of each land owned by the user
 * @param pachaPasses: list of uuids of each pacha pass owned by the user
 */
interface NftList {
    guineaPigs: number[];
    lands: number[];
    pachaPasses: number[];
    tatacuy: number[];
    wiracocha: number[];
    chakra: number[];
    hatunwasi: number[];
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Address of the user
 * @return Three lists of NFTs owned by the user: one for Guinea Pigs, one for Lands and one for Pacha Passes
 */
export async function getListOfNftsPerAccount(
    _account: string
): Promise<NftList> {
    var { guineaPigs, lands, pachaPasses } =
        await nftpContract.getListOfNftsPerAccount(_account);
    guineaPigs = guineaPigs.filter(
        (number: BigNumber) => number.toString() != String(0)
    );
    lands = lands.filter((number: BigNumber) => number.toString() != String(0));
    pachaPasses = pachaPasses.filter(
        (number: BigNumber) => number.toString() != String(0)
    );

    var { _listOfUuids, _listOfTypes } =
        await nftpContract.getListOfUuidsPerAccount(_account);

    var tatacuy = [];
    var wiracocha = [];
    var chakra = [];
    var hatunwasi = [];

    for (var ix = 0; ix < _listOfUuids.length; ix++) {
        switch (_listOfTypes[ix]) {
            case TATACUY:
                tatacuy.push(ix);
                break;
            case WIRACOCHA:
                wiracocha.push(ix);
                break;
            case CHAKRA:
                chakra.push(ix);
                break;
            case HATUNWASI:
                hatunwasi.push(ix);
                break;
            default:
                break;
        }
    }

    return {
        guineaPigs,
        lands,
        pachaPasses,
        tatacuy,
        wiracocha,
        chakra,
        hatunwasi,
    };
}

/**
 * @param guineaPigs array of uuid for each Puinea Pig.
 * @param lands array of uuid for each Pacha.
 * @param pachaPasses array of uuid for each Pacha Pass.
 * @param tokenBalance shows the balance of Pacha Cuy tokens for this wallet
 */
interface IWalletInfo {
    guineaPigs: number[];
    lands: number[];
    pachaPasses: number[];
    tokenBalance: ethers.BigNumber;
}

/**
 *
 * @param _account: Wallet address of the user
 * @returns Returns a type of IWalletInfo that contains information about the wallee of the player
 */
export async function getWalletData(_account: string): Promise<IWalletInfo> {
    var { guineaPigs, lands, pachaPasses } = await getListOfNftsPerAccount(
        _account
    );
    var tokenBalance = await pcuyContract.balanceOf(_account);
    return {
        guineaPigs,
        lands,
        pachaPasses,
        tokenBalance,
    };
}
