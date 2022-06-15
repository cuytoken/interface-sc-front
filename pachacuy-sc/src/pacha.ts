import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import pachaAbi from "./abi/pachaAbi";

declare var __pachaAddress__: string;

var pachaAddress = __pachaAddress__;
var provider: providers.Web3Provider = null;
var pachaContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initPacha(_provider: providers.ExternalProvider): Contract[] {
    provider = new providers.Web3Provider(_provider);
    pachaContract = new Contract(pachaAddress, pachaAbi, provider);
    return [pachaContract];
}

export async function isPachaAlreadyTaken(_location: number): Promise<boolean> {
    return await pachaContract.isPachaAlreadyTaken(_location);
}

export interface PachaInfo {
    isPacha: boolean;
    isPublic: boolean;
    uuid: number;
    pachaPassUuid: number;
    pachaPassPrice: number;
    typeOfDistribution: number;
    idForJsonFile: number;
    wasPurchased: number;
    location: number;
    owner: string;
    price: number;
    listPachaPassOwners: string[];
}
export async function getPachaWithUuid(_pachaUuid: number): Promise<PachaInfo> {
    return await pachaContract.getPachaWithUuid(_pachaUuid);
}

export async function getListOfPachas(): Promise<PachaInfo[]> {
    return await pachaContract.getListOfPachas();
}

/**
 * @notice Converts a private pacha to a public pacha
 * @param _pachaUuid: Uuif of the pacha that will become public (no pacha pass required)
 */
export async function setPachaToPublic(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<PachaInfo[]> {
    var tx = await pachaContract.setPachaToPublic(_pachaUuid);
    return await tx.wait(_numberOfConfirmations);
}

/**
 * @notice Set a Pacha to private and choose type of distribution (private with not price or public with price)
 * @param _pachaUuid uuid of the land for which the pacha pass will be created
 * @param _price price of pachapass in PCUY. If '_typeOfDistribution' is 1, '_price' must be 0
 * @param _typeOfDistribution (1, 2) - private distribution (no price) or public sale of pacha pass
 */
export async function setPachaPrivacyAndDistribution(
    _signer: Signer,
    _pachaUuid: number,
    _price: number,
    _typeOfDistribution: number,
    _numberOfConfirmations: number = 1
): Promise<PachaInfo[]> {
    var tx = await pachaContract.setPachaPrivacyAndDistribution(
        _pachaUuid,
        _price,
        _typeOfDistribution
    );
    return await tx.wait(_numberOfConfirmations);
}

/**
 * @param isPachaPass: Indicates whether the pacha pass exists or not
 * @param pachaUuid: Uuid of the Pacha where the pacha pass belongs to
 * @param typeOfDistribution: 1 -> private and no price, 2 -> with price and public sale
 * @param uuid: Uuid of the pacha pass
 * @param price: Price paid to obtain the pachapass
 * @param transferMode: Either "transferred" (Type Dist. 1 - private sale) or "purchased" (Type Dist. 2 - public sale)
 */
export interface PachaPassInfo {
    isPachaPass: boolean;
    pachaUuid: number;
    typeOfDistribution: number;
    uuid: number;
    price: number;
    transferMode: "purchased" | "transferred";
    listPachaPassOwners: string[];
}

export async function getPachaPassWithUuid(
    _pachaPassUuid: number
): Promise<PachaPassInfo> {
    return await pachaContract.getPachaPassWithUuid(_pachaPassUuid);
}

export async function getListOfPachaPasses(): Promise<PachaPassInfo[]> {
    return await pachaContract.getListOfPachaPasses();
}
