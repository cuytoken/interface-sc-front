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
): Contract {
    provider = new providers.Web3Provider(_provider);
    misayWasiContract = new Contract(misayWasiAddress, misayWasiAbi, provider);
    return misayWasiContract;
}

/**
 * @notice initiated by the owner of the misay wasi who deposits funds
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _misayWasiUuid: Uuid of the Misay Wasi where the owner is creating a raffle
 * @param _rafflePrize: Prize of the raffle to be given by the owner
 * @param _ticketPrice: Price to pay by a participant of the raffle
 * @param _campaignEndDate: Timestamp ending date where the raffle will finish
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
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
 * @param _misayWasiUuids Array of Uuid of the Misay Wasis that will start the raffle
 * @dev Called only by the cloud using an access role
 * @dev Called every day at 10 AM UTC-5
 */
export async function startRaffleContest(_misayWasiUuids: number[]) {
    return await misayWasiContract.startRaffleContest(_misayWasiUuids);
}

/**
 * Returns the list raffles that have a passed contest date
 * @returns IMisayWasiInfo[]
 */
export async function getListOfMisayWasisReadyToRaffle(): Promise<
    IMisayWasiInfo[]
> {
    return await misayWasiContract.getListOfMisayWasisReadyToRaffle();
}
/**
 * Returns the list of active raffles
 * @returns IMisayWasiInfo[]
 */
export async function getListOfActiveMWRaffles(): Promise<IMisayWasiInfo[]> {
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
export interface IMisayWasiInfo {
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
/**
 * Returns informantion about the Misay Wasi NFT
 * @param _misayWasiUuid Uuid of the Misay Wasi when it was minted
 * @returns ImsayWasiInfo
 */
export async function getMisayWasiWithUuid(
    _misayWasiUuid: number
): Promise<IMisayWasiInfo> {
    return await misayWasiContract.getMisayWasiWithUuid(_misayWasiUuid);
}

/**
 * Returns information about the Misay Wasi where the ticket was purchased
 * @param _ticketUuid Uuid of the ticket purchased at Misay Wasi
 * @returns IMisayWasiInfo
 */
export async function getMiswayWasiWithTicketUuid(
    _ticketUuid: number
): Promise<IMisayWasiInfo> {
    return await misayWasiContract.getMiswayWasiWithTicketUuid(_ticketUuid);
}

/**
 * @note Event that indicates the end of a raflle contest
 * @param winner: Wallet address of the winner of this raffle contest
 * @param misayWasiUuid: Uuid of the Misay Wasi where the raffle contest took place
 * @param rafflePrize: Net prize (minus fee) of the Misay Wasi allocated by the Misay Wasi's owner
 * @param raffleTax: Tax applied to the prize
 * @param ticketUuid: Uuid of the ticket purchased at this Misay Wasi
 */
export interface RaffleContestFinished {
    winner: string;
    misayWasiUuid: number;
    rafflePrize: number;
    raffleTax: number;
    ticketUuid: number;
}

export interface PurchaseTicketFromMisayWasi {
    account: string;
    misayWasiUuid: number;
    pachaUuid: number;
    ticketPrice: number;
    amountOfTickets: number;
}

export interface PurchaseMisayWasi {
    account: string;
    misayWasiUuid: number;
    pachaUuid: number;
    creationDate: number;
    misayWasiPrice: number;
}