import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer, ethers } from "ethers";

import tatacuyAbi from "./abi/tatacuyAbi";

declare var __tatacuyAddress__: string;
declare var __chainId__: string;
declare var __webhookTatacuy__: string;
declare var __version__: string;

interface SignerData extends TypedDataSigner {
    _address: string;
}

var tatacuyAddress = __tatacuyAddress__;
var chainId = __chainId__;
var version = __version__;
var webhookTatacuy = __webhookTatacuy__;
var provider: providers.Web3Provider = null;
var tatacuyContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initTatacuy(_provider: providers.ExternalProvider): Contract {
    provider = new providers.Web3Provider(_provider);
    tatacuyContract = new Contract(tatacuyAddress, tatacuyAbi, provider);
    return tatacuyContract;
}

// All properties on a domain are optional
const domain = {
    name: "Tatacuy Game",
    version,
    chainId,
    verifyingContract: tatacuyAddress,
};

// The named list of all type definitions
const types = {
    TatacuyGame: [
        { name: "context", type: "string" },
        { name: "guineaPig", type: "string" },
        { name: "wallet", type: "address" },
        { name: "likelihood", type: "string" },
    ],
};

// The data to sign
const value = {
    context: "Winning Sami Points at Tatacuy",
    guineaPig: "",
    wallet: "",
    likelihood: "",
};

/**
 * @notice Signs a transaction for playing Tatacuy Game and verifies in the cloud
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _guineaPigUuid: Guinea Pig uuid (when minted) that is trying luck at Tatacuy Gamer
 * @param _likelihood: A number between 1 and 10 inlcusive. Represents the chances of winning
 * @param _timeStampFront: Timestamp used to be evaluated at backend to determine if guinea pig is playing or not
 * @param _tatacuyUuid: Uuid of the Tatacuy when it was minted
 */
export async function signTatacuyTxAndVerify(
    _signer: SignerData,
    _guineaPigUuid: number,
    _likelihood: number,
    _timeStampFront: number,
    _tatacuyUuid: number,
): Promise<boolean> {
    // Signing the transaction
    value.guineaPig = String(_guineaPigUuid);
    value.wallet = _signer._address;
    value.likelihood = String(_likelihood);
    var signature = await _signer._signTypedData(domain, types, value);

    var payload = {
        ...value,
        signature,
        timeStampFront: _timeStampFront
    };
    var data = {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    var res = await fetch(webhookTatacuy, data);
    return await res.json();
}

export interface IFinishTatacuy {
    tatacuyOwner: string;
    totalSamiPoints: number;
    samiPointsClaimed: number;
    changeSamiPoints: number;
}

/**
 * @dev Finished a Tatacuy campaign and returns the amount of Sami Points remaining in the campaign
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _tatacuyUuid: Uuid of the Tatacuy assigned when minted. Pacha that will start a Tatacuy campaign
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function finishTatacuyCampaign(
    _signer: Signer,
    _tatacuyUuid: number,
    _numberOfConfirmations: number = 1
): Promise<IFinishTatacuy> {
    if (!provider) throw new Error("No provider set");
    var tx = await tatacuyContract
        .connect(_signer)
        .finishTatacuyCampaign(_tatacuyUuid);

    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x66267755a2fa60145357d3d833bf483b85709ef52488982aced05d7c17fcb70b";

    var args;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            args = ev.args;
            break;
        }
    }
    var { tatacuyOwner, totalSamiPoints, samiPointsClaimed, changeSamiPoints } =
        args;

    return { tatacuyOwner, totalSamiPoints, samiPointsClaimed, changeSamiPoints };
}

/**
 * @dev Details the information of a Tatacuy. Additional properties attached for its campaign
 * @param owner: Wallet address of the current owner of the Tatacuy
 * @param tatacuyUuid: Uuid of the Tatacuy when it was minted
 * @param pachaUuid: Uuid of the pacha where this Tatacuy is located
 * @param creationDate: Timestamp of the Tatacuy when it was minted
 * @param totalFundsPcuyDeposited: Amount of PCUYs deposited when a Tatacuy campaign was created
 * @param ratePcuyToSamiPoints: Exchange rate from PCUY token to Sami Points when Tatacuy campaign was created
 * @param totalFundsSamiPoints: Amount of Sami Points (converted from PCUY tokens) assignated for the campaign
 * @param prizePerWinnerSamiPoints: Amount of Sami Points each winner will receive
 * @param totalSamiPointsClaimed: Accumulates Sami Points after a player wins at a Tatacuy Game
 * @param campaignStartDate: Timestamp when the campaign started
 * @param campaignEndDate: Timestamp when the campaign ended
 * @param hasTatacuy: Whether a Tatacuy exists or not
 * @param isCampaignActive: Indicates if there is an active Tatacuy campaign
 */
export interface ITatacuyCampaign {
    owner: string;
    tatacuyUuid: number;
    pachaUuid: number;
    creationDate: number;
    totalFundsPcuyDeposited: number;
    ratePcuyToSamiPoints: number;
    totalFundsSamiPoints: number;
    prizePerWinnerSamiPoints: number;
    totalSamiPointsClaimed: number;
    campaignStartDate: number;
    campaignEndDate: number;
    hasTatacuy: boolean;
    isCampaignActive: boolean;
}
/**
 * @dev Retrives the list of all active Tatacuy campaigns
 * @notice A campaign is when a Tatacuy is giving away prizes to Guinea Pigs
 * @returns Gives back an array of objectes with the structure of 'ITatacuyCampaign'
 */
export async function getListOfTatacuyCampaigns(): Promise<ITatacuyCampaign[]> {
    return await tatacuyContract.getListOfTatacuyCampaigns();
}

/**
 * @dev Retrives the list of all active Tatacuy campaigns
 * @notice A campaign is when a Tatacuy is giving away prizes to Guinea Pigs
 * @param _tatacuyUuid: Uuid of the Tatacuy when it was minted
 * @returns Gives back an object with the structure of 'ITatacuyCampaign'
 */
export async function getTatacuyWithUuid(
    _tatacuyUuid: number
): Promise<ITatacuyCampaign> {
    return await tatacuyContract.getTatacuyWithUuid(_tatacuyUuid);
}

/**
 * @dev Starts a Tatacuy Campaign for a particular account and saves its info
 * @dev A user can create as many campaigns as Tatacuys he has
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _tatacuyUuid: Uuid assigned when a Tatacuy was minted
 * @param _totalFundsPcuyDeposited: Total funds (in PCUY) to be distributed in a Tatacuy campaign
 * @param _prizePerWinnerPcuy: Prize to be given (in PCUY) to each winner at tatacuy
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function startTatacuyCampaign(
    _signer: Signer,
    _tatacuyUuid: number,
    _totalFundsPcuyDeposited: number,
    _prizePerWinnerPcuy: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await tatacuyContract
        .connect(_signer)
        .startTatacuyCampaign(
            _tatacuyUuid,
            _totalFundsPcuyDeposited,
            _prizePerWinnerPcuy
        );
    return await tx.wait(_numberOfConfirmations);
}

/**
 * @notice Event emitted when there is a result from playing at Tatacuy
 * @param account: wallet address of the player at tatacuy
 * @param hasWon: indicates (boolean) whether the player has won or loose
 * @param prizeWinner: amount of sami points to be given to the winner
 * @param likelihood: chances of winning at Tatacuy (1 to 10)
 * @param pachaUuid: uuid of the pacha when it was minted
 * @param tatacuyUuid: uuid of the tatacuy when it was minted
 * @param pachaOwner: wallet address of the pacha owner
 * @param idFromFront: An ID coming from front to keep track of the winner at Tatacuy
 */
export interface TatacuyTryMyLuckResult {
    account: string;
    hasWon: boolean;
    prizeWinner: number;
    likelihood: number;
    pachaUuid: number;
    tatacuyUuid: number;
    pachaOwner: string;
    idFromFront: number;
}
