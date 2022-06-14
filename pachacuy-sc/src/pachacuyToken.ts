import { Contract, ethers, utils, providers, Signer } from "ethers";

import pcuyAbi from "./abi/pcuyAbi";

declare var __pcuyTokenAddress__: string;

var pcuyTokenAddress = __pcuyTokenAddress__;

var provider: providers.Web3Provider = null;

export var pcuyContract: Contract;

export function initPachacuyToken(
    _provider: providers.ExternalProvider
): Contract {
    provider = new providers.Web3Provider(_provider);
    pcuyContract = new Contract(pcuyTokenAddress, pcuyAbi, provider);
    return pcuyContract;
}


export async function getPachacuyBalance(_account: string): Promise<string> {
    return utils.formatEther(await pcuyContract.balanceOf(_account));
}