"use strict";
import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

declare var __pachacuyInfoAddress__: string;
declare var __rpcBinance__: string;

var pachacuyInformationAddress = __pachacuyInfoAddress__;
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
    _exchangeRatePcuyToSami: number;
}
export async function getAllGameInformation(): Promise<IGameInformation> {
    return await pachacuyInformationContract.getAllGameInformation();
}

export async function getInformationByRank(
    _rank: number
): Promise<InformationBasedOnRank> {
    return await pachacuyInformationContract.getInformationByRank(_rank);
}

////////////////////////
///  EXCHANGE RATE   ///
////////////////////////
export async function getExchangeRatePcuyToSami(): Promise<number> {
    return await pachacuyInformationContract.getExchangeRatePcuyToSami();
}

export async function convertBusdToPcuy(_busdAmount: number): Promise<number> {
    return await pachacuyInformationContract.convertBusdToPcuy(_busdAmount);
}
export async function convertPcuyToSami(_pcuyAmount: number): Promise<number> {
    return await pachacuyInformationContract.convertPcuyToSami(_pcuyAmount);
}
export async function convertSamiToPcuy(_samiAmount: number): Promise<number> {
    return await pachacuyInformationContract.convertSamiToPcuy(_samiAmount);
}

export async function exchangeRateBusdToPcuy(): Promise<number> {
    return await pachacuyInformationContract.exchangeRateBusdToPcuy();
}
export async function exchangeRatePcuyToSami(): Promise<number> {
    return await pachacuyInformationContract.exchangeRatePcuyToSami();
}

export async function chakraPrice(): Promise<number> {
    return await pachacuyInformationContract.chakraPrice();
}
export async function misayWasiPrice(): Promise<number> {
    return await pachacuyInformationContract.misayWasiPrice();
}
export async function pachaPrice(): Promise<number> {
    return await pachacuyInformationContract.pachaPrice();
}
export async function qhatuWasiPrice(): Promise<number> {
    return await pachacuyInformationContract.qhatuWasiPrice();
}

////////////////////////
///      EVENTS      ///
////////////////////////
export interface BoxesPerDayPerPachaDx {
    previousAmount: number;
    newAmount: number;
}
export interface MinimumSamiPointsDx {
    previousAmount: number;
    newAmount: number;
}
export interface MaximumSamiPointsDx {
    previousAmount: number;
    newAmount: number;
}
export interface InfoByRankUpdate {
    rank: number;
    maxSamiPoints: number;
    boxes: number;
    affectation: number;
}
export interface ExchangeRatePcuyToSamiDx {
    previousAmount: number;
    amount: number;
}
export interface ExchangeRateBusdToPcuyDx {
    previousAmount: number;
    amount: number;
}
