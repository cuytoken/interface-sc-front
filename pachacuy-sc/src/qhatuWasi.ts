import { Contract, providers, Signer } from "ethers";

import qhatuWasiAbi from "./abi/qhatuWasiAbi";

declare var __qhatuWasiAddress__: string;

var qhatuWasiAddress = __qhatuWasiAddress__;
var provider: providers.Web3Provider = null;
var qhatuWasiContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initqhatuWasi(
    _provider: providers.ExternalProvider
): Contract[] {
    provider = new providers.Web3Provider(_provider);
    qhatuWasiContract = new Contract(qhatuWasiAddress, qhatuWasiAbi, provider);
    return [qhatuWasiContract];
}

/**
 * 
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _qhatuWasiUuid: Uuid of the Qhatu Wasi when it was minted 
 * @param _amountPcuyCampaign: Amount in PCUY to be deposited by the campaign
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function startQhatuWasiCampaign(
    _signer: Signer,
    _qhatuWasiUuid: number,
    _amountPcuyCampaign: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await qhatuWasiContract.startQhatuWasiCampaign(
        _qhatuWasiUuid,
        _amountPcuyCampaign
    );
    // PENDING
    /**
     * extract
     * QhatuWasiCampaignStarted topic
     */
    var res = await tx.wait(_numberOfConfirmations);
}

export interface QhatuWasiInfo {
    uuid: number;
    owner: string;
    creationDate: number;
    totalPcuyDeposited: number;
    pcuyForCurrentCampaign: number;
    samiPointsToGiveAway: number;
    qhatuWasiPrice: number;
}
export async function getListOfQhatuWasi(): Promise<QhatuWasiInfo[]> {
    return await qhatuWasiContract.getListOfQhatuWasi();
}

export async function getQhatuWasiWithUuid(
    _qhatuWasiUuid: number
): Promise<QhatuWasiInfo> {
    return await qhatuWasiContract.getQhatuWasiWithUuid(_qhatuWasiUuid);
}
