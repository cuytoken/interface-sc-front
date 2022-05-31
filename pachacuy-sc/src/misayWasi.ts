import { Contract, providers, Signer } from "ethers";

import misayWasiAbi from "./abi/misayWasiAbi";

declare var __misayWasiAddress__: string;

var misayWasiAddress = __misayWasiAddress__;
var provider: providers.Web3Provider = null;
var misayWasiContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initMisayWasi(
    _provider: providers.ExternalProvider
): Contract[] {
    provider = new providers.Web3Provider(_provider);
    misayWasiContract = new Contract(misayWasiAddress, misayWasiAbi, provider);
    return [misayWasiContract];
}

/**
 * @notice initiated by the owner of the misay wasi who deposts funds
 * @param _signer
 * @param _misayWasiUuid
 * @param _rafflePrize
 * @param _ticketPrice
 * @param _campaignEndDate
 * @param _numberOfConfirmations
 * @returns
 */
export async function startMisayWasiRaffle(
    _signer: Signer,
    _misayWasiUuid: number,
    _rafflePrize: number,
    _ticketPrice: number,
    _campaignEndDate: number,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await misayWasiContract
        .connect(_signer)
        .startMisayWasiRaffle(
            _misayWasiUuid,
            _rafflePrize,
            _ticketPrice,
            _campaignEndDate
        );

    return await tx.wait(_numberOfConfirmations);
}

/**
 * Initiated by the backend
 * @param _misayWasiUuids 
 * @returns 
 */
export async function startRaffleContest(_misayWasiUuids: number[]) {
    return await misayWasiContract.startRaffleContest(_misayWasiUuids);
}
export async function getListOfMisayWasisReadyToRaffle() {
    return await misayWasiContract.getListOfMisayWasisReadyToRaffle();
}

export async function getListOfActiveMWRaffles() {
    return await misayWasiContract.getListOfActiveMWRaffles();
}

/**
 * @dev Details the information of a Tatacuy. Additional properties attached for its campaign
 * @param owner: Wallet address of the current owner of the Tatacuy
 * @param misayWasiUuid: Uuid of the misay waysi when it was minted
 * @param pachaUuid: Uuid of the pacha where the misay waysi belongs to
 * @param creationDate: Date when the misay waysi was minted
 * @param ticketPrice: Price ticket to participate in the raffle
 * @param ticketUuid: Uuid of the ticket of the Misay Wasi
 * @param misayWasiPrice: Price in PCUY of the Misay Wasi
 * @param rafflePrize: Prize of winning at the raffle
 * @param numberTicketsPurchased: Number of raffle tickets bought
 * @param campaignStartDate: Timestamp when the raffle initiated
 * @param campaignEndDate: Timestamp when the raffle ends
 * @param isCampaignActive: Indicates wheter this misay waysi is running a raffle or not
 * @param hasMisayWasi: Indicates wheter a misay wasi exists or not
 */
interface MisayWasiInfo {
    owner: string;
    misayWasiUuid: number;
    pachaUuid: number;
    creationDate: number;
    ticketPrice: number;
    ticketUuid: number;
    misayWasiPrice: number;
    rafflePrize: number;
    numberTicketsPurchased: number;
    campaignStartDate: number;
    campaignEndDate: number;
    isCampaignActive: boolean;
    hasMisayWasi: boolean;
    listOfParticipants: string[];
}
export async function getMisayWasiWithUuid(
    _misayWasiUuid: number
): Promise<MisayWasiInfo> {
    return await misayWasiContract.getMisayWasiWithUuid(_misayWasiUuid);
}

export async function getMiswayWasiWithTicketUuid(
    _ticketUuid: number
): Promise<MisayWasiInfo> {
    return await misayWasiContract.getMiswayWasiWithTicketUuid(_ticketUuid);
}
