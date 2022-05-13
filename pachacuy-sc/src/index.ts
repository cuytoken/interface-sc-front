"use strict";

import { BigNumber, Contract, ethers, providers, Signer } from "ethers";
import { initTatacuy } from "./tatacuy";
export {
    signTatacuyTxAndVerify,
    finishTatacuyCampaign,
    getListOfTatacuyCampaigns,
    getTatacuyInfoForAccount,
    startTatacuyCampaign,
} from "./tatacuy";
// export { signTatacuyTransaction } from "./wiracocha";

import busdAbi from "./abi/busdAbi";
import nftpAbi from "./abi/nftpAbi";
import pacAbi from "./abi/pacAbi";
import pcuyAbi from "./abi/pcuyAbi";

declare var __busdAddress__: string;
declare var __pacAddress__: string;
declare var __nftpAddress__: string;
declare var __pcuyTokenAddress__: string;

var busdAddress = __busdAddress__;
var pacAddress = __pacAddress__;
var nftpAddress = __nftpAddress__;
var pcuyTokenAddress = __pcuyTokenAddress__;

var provider: providers.Web3Provider = null;

var busdContract: Contract;
var nftpContract: Contract;
var pacContract: Contract;
var pcuyContract: Contract;

////////////////////////
///       INIT       ///
////////////////////////
/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
    var tataCuyContract = initTatacuy(_provider);
    provider = new providers.Web3Provider(_provider);
    busdContract = new Contract(busdAddress, busdAbi, provider);
    nftpContract = new Contract(nftpAddress, nftpAbi, provider);
    pacContract = new Contract(pacAddress, pacAbi, provider);
    pcuyContract = new Contract(pcuyTokenAddress, pcuyAbi, provider);
    return [nftpContract, pacContract, ...tataCuyContract];
}

////////////////////////
///       BUSD       ///
////////////////////////
/**
 * @dev Function that approves the smart contract to operate the user's funds
 * @param _amount: Amount to be approved in favor of the smart contract
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function approveBusd(
    _amount: BigNumber,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await busdContract.connect(_signer).approve(pacAddress, _amount);
    return await tx.wait(_numberOfConfirmations);
}

/**
 * @dev Function that finds the allowance give in favor of the smart contract
 * @param _account: Wallet address of the user
 */
export async function allowance(_account: string): Promise<BigNumber> {
    if (!provider) throw new Error("No provider set");
    return await busdContract.allowance(_account, pacAddress);
}
////////////////////////
///     PURCHASE     ///
////////////////////////
/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 BUSD, 2 -> 10 BUSD, 3 -> 15 BUSD)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchaseGuineaPigWithBusd(
    _ix: number,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseGuineaPigWithBusd(_ix);
    await tx.wait(_numberOfConfirmations);
}

/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 * rate PCUY, 2 -> 10 * rate PCUY, 3 -> 15 * rate PCUY)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchaseGuineaPigWithPcuy(
    _ix: number,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseGuineaPigWithPcuy(_ix);
    await tx.wait(_numberOfConfirmations);
}

/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchaseLandWithBusd(_location: number, _signer: Signer) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchaseLandWithBusd(_location);
}

/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchaseLandWithPcuy(_location: number, _signer: Signer) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchaseLandWithPcuy(_location);
}

/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchasePachaPassWithPcuy(
    _landUuid: number,
    _signer: Signer
) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchasePachaPassWithPcuy(_landUuid);
}

/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchasePachaPassWithBusd(
    _landUuid: number,
    _signer: Signer
) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchasePachaPassWithBusd(_landUuid);
}

////////////////////////
///      HELPER      ///
////////////////////////
/**
 * @notice Finds out if a visitor has access to a particular pacha
 * @param _visitorAddress: Visitor address to verify if he has access
 * @param _landUuid: A uuid of a land that will be checked against the visitor's access
 */
export async function isGuineaPigAllowedInPacha(
    _visitorAddress: string,
    _landUuid: number
): Promise<boolean> {
    if (!provider) throw new Error("No provider set");
    return await nftpContract.isGuineaPigAllowedInPacha(
        _visitorAddress,
        _landUuid
    );
}

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
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Address of the user
 * @return Three lists of NFTs owned by the user: one for Guinea Pigs, one for Lands and one for Pacha Passes
 */
export async function getListOfNftsPerAccount(
    _account: string
): Promise<NftList> {
    if (!provider) throw new Error("No provider set");
    var { guineaPigs, lands, pachaPasses } = await nftpContract.getListOfNftsPerAccount(
        _account
    );
    guineaPigs = guineaPigs.filter(
        (number: BigNumber) => number.toString() != String(0)
    );
    lands = lands.filter((number: BigNumber) => number.toString() != String(0));
    pachaPasses = pachaPasses.filter((number: BigNumber) => number.toString() != String(0));

    return {
        guineaPigs,
        lands,
        pachaPasses
    };
}

/**
 *
 * @param isGuineaPig Indicates wheter the NFT is a Guinea Pig or not
 * @param race Guinea Pig's race assigned when the cuy was minted
 * @param gender Guinea Pig's gender assigned when the cuy was minted
 * @param speed Walking velocity of the Guinea Pig given when it was minted.
 * @param daysUntilHungry Number of days that Guinea Pig do not need food
 * @param daysUntilDeath Number of days that Guinea Pig will survive without food
 * @param samiPoints It's like cash back. For every token spent, a percentage is given back to the spender.
 * @param uuid Unique identifier of the Guinea Pig given when it was minted.
 * @param idForJsonFile Indicates the index of the NFT in the JSON file.
 * @param feedingDate Represents the timestamp limit when the Guinea Pig needs food. Otherwise it will die.
 * @param burningDate Represents the timestamp of the additional three days given on top of 'feedingDate'. After that the NFT is burned.
 * @param wasBorn Time when the Guinea Pig was born.
 * @param owner Wallet address of the Guinea Pig owner.
 *
 */
interface IDataGuineaPig {
    isGuineaPig: boolean;
    race: string;
    gender: string;
    speed: number;
    daysUntilHungry: number;
    daysUntilDeath: number;
    samiPoints: number;
    uuid: number;
    idForJsonFile: number;
    feedingDate: number;
    burningDate: number;
    wasBorn: number;
    owner: string;
}
/**
 *
 * @param _uuid Guinea Pig's uuid given when it was minted
 * @returns Returns a type of IDataguineaPig object that contains information about the Guinea Pig's properties
 */
export async function getGuineaPigData(
    _uuid: number
): Promise<IDataGuineaPig | boolean> {
    var guineaPigData: IDataGuineaPig = await nftpContract.getGuineaPigData(
        _uuid
    );
    return guineaPigData.isGuineaPig
        ? {
            ...guineaPigData,
        }
        : false;
}

/**
 *
 * @param isLand Indicates wheter the NFT is a Land or not
 * @param isPublic Indicates wheter the Land is public or private
 * @param uuid Unique identifier when the Land was minted
 * @param location Number from 1 to 697 indicating a location
 * @param idForJsonFile Indicates the index of the NFT in the JSON file.
 * @param wasPurchased Time when the Land was purchased.
 */
interface IDataLand {
    isLand: boolean;
    isPublic: boolean;
    uuid: number;
    location: number;
    idForJsonFile: number;
    wasPurchased: number;
}
/**
 *
 * @param _uuid Lands's uuid given when it was minted
 * @returns Returns a type of IDataLand object that contains information about Land's properties
 */
export async function getLandData(_uuid: number): Promise<IDataLand | boolean> {
    var landData: IDataLand = await nftpContract.getLandData(_uuid);
    return landData.isLand ? { ...landData } : false;
}

/**
 *
 * @param _account Wallet address of the user
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that uuid owned by the user
 */
export async function balanceOf(
    _account: string,
    _uuid: number
): Promise<number> {
    return await nftpContract.balanceOf(_account, _uuid);
}

/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that particular uuid
 */
export async function totalSupply(_uuid: number): Promise<number> {
    return await nftpContract.totalSupply(_uuid);
}

/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the ipfs prefix that contains the NFT's data
 */
export async function tokenURI(_uuid: number): Promise<string> {
    var pinata = "https://gateway.pinata.cloud/ipfs/";

    var prefix = await nftpContract.tokenURI(_uuid);
    prefix = prefix.split("//")[1];

    var data: any = await fetch(`${pinata}${prefix}`);
    data = await data.json();
    var image = data.image;
    image = image.split("//")[1];

    return `${pinata}${image}`;
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
    var { guineaPigs, lands, pachaPasses } = await getListOfNftsPerAccount(_account);
    var tokenBalance = await pcuyContract.balanceOf(_account)
    return {
        guineaPigs,
        lands,
        pachaPasses,
        tokenBalance,
    };
}

// NOT IMPLEMENTED
// Pacha Pass
/**
 * @param pachaId: Pacha's ID (unique identifier) to which the Pacha Pass belongs to
 * @param owner: Wallet address of the Pacha Pass owner
 * @param cost: Amount of tokens paid to get the Pacha Pass
 * @param transferMode: One of the following: 'purchased'(when public pachapass) or 'transferred'(when private pacha).
 */

interface IPachaPass {
    isPachaPass: boolean;
    pachaUuid: number;
    typeOfDistribution: number;
    uuid: number;
    cost: number;
    transferMode: "purchased" | "transferred";
}

/**
 *
 * @param _uuid Pacha Pass' uuid given when it was minted
 * @returns Returns a type of IPachaPass object that contains information about the Pacha Pass properties
 */
export async function getPachaPassData(_uuid: number): Promise<IPachaPass | boolean> {

    var pachaPassData: IPachaPass = await nftpContract.getPachaPassData(_uuid);
    return pachaPassData.isPachaPass ? { ...pachaPassData } : false;
}
