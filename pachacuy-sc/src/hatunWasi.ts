import { Contract, providers } from "ethers";

import hatunWasiAbi from "./abi/hatunWasiAbi";

declare var __hatunWasiAddress__: string;

var hatunWasiAddress = __hatunWasiAddress__;
var provider: providers.Web3Provider = null;
var hatunWasiContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initHatunWasi(_provider: providers.ExternalProvider): Contract {
    provider = new providers.Web3Provider(_provider);
    hatunWasiContract = new Contract(hatunWasiAddress, hatunWasiAbi, provider);
    return hatunWasiContract;
}
/**
 * @dev Details the information of a Hatun Wasi.
 * @param owner: Wallet address of the current owner of the Hatun Wasi
 * @param hatunWasiUuid: Uuid of the Hatun Wasi when it was minted
 * @param pachaUuid: Uuid of the pacha where the Hatun Wasi belongs to
 * @param creationDate: Date when the Hatun Wasi was minted
 * @param hasHatunWasi: Indicates wheter a Hatun Wasi exists exists or not
 */
export interface IHatunWasiInfo {
    owner: string;
    hatunWasiUuid: number;
    pachaUuid: number;
    creationDate: number;
    hasHatunWasi: boolean;
}
export async function getListOfHatunWasis(): Promise<IHatunWasiInfo[]> {
    return await hatunWasiContract.getListOfHatunWasis();
}

export async function getHatunWasiWithUuid(
    _hatunWasiUuid: number
): Promise<IHatunWasiInfo> {
    return await hatunWasiContract.getHatunWasiWithUuid(_hatunWasiUuid);
}

export interface MintHatunWasi {
    owner: string;
    hatunWasiUuid: number;
    pachaUuid: number;
    creationDate: number;
}
