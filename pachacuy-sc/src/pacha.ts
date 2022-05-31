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

interface PachaInfo {
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
}
export async function getPachaWithUuid(_pachaUuid: number): Promise<PachaInfo> {
    return await pachaContract.getPachaWithUuid(_pachaUuid);
}

export async function getListOfPachas(_pachaUuid: number): Promise<PachaInfo[]> {
    return await pachaContract.getListOfPachas(_pachaUuid);
}
