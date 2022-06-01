import { Contract, providers, Signer } from "ethers";

import guineaPigAbi from "./abi/guineaPigAbi";

declare var __guineaPigAddress__: string;

var guineaPigAddress = __guineaPigAddress__;
var provider: providers.Web3Provider = null;
var guineaPigContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initGuineaPig(
    _provider: providers.ExternalProvider
): Contract[] {
    provider = new providers.Web3Provider(_provider);
    guineaPigContract = new Contract(guineaPigAddress, guineaPigAbi, provider);
    return [guineaPigContract];
}

export interface IGuineaPigInfo {
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

export async function getGuineaPigWithUuid(
    _guineaPigUuid: number
): Promise<IGuineaPigInfo> {
    return await guineaPigContract.getGuineaPigWithUuid(_guineaPigUuid);
}

export async function getListOfGuineaPigs(): Promise<IGuineaPigInfo[]> {
    return await guineaPigContract.getListOfGuineaPigs();
}
