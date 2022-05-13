"use strict";
import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

declare var __pachacuyInformationAddress__: string;
declare var __rpcBinance__: string;

var pachacuyInformationAddress = __pachacuyInformationAddress__;
var rpcBinance = __rpcBinance__;

import pachacuyInformationAbi from "./abi/pachacuyInfoAbi";

var provider = new providers.JsonRpcProvider(rpcBinance);
var pachacuyInformationContract: Contract = new Contract(
    pachacuyInformationAddress,
    pachacuyInformationAbi,
    provider
);

////////////////////////
///       INIT       ///
////////////////////////
/**
 * @dev This function inits the library and connects to the blockchain
 * @return Gives back the contract PachacuyInformation
 */
export function getContract(): Contract {
    return pachacuyInformationContract;
}

interface InformationBasedOnRank {
    maxSamiPoints: number;
    boxes: number;
    affectation: number;
}

interface IGameInformation {
    _infoArrayBasedOnRank: InformationBasedOnRank[];
    _amountOfBoxesPerPachaPerDay: number;
    _amountOfMinimumSamiPoints: number;
    _amountOfMaximumSamiPoints: number;
    _exchangeRateBusdToPcuy: number;
}
export async function getAllGameInformation(): Promise<IGameInformation> {
    return await pachacuyInformationContract.getAllGameInformation();
}

export async function getInformationByRank(
    _rank: number
): Promise<InformationBasedOnRank> {
    return await pachacuyInformationContract.getInformationByRank(_rank);
}

export async function getExchangeRateBusdToPcuy(): Promise<number> {
    return await pachacuyInformationContract.getExchangeRateBusdToPcuy();
}
