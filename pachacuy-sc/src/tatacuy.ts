import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import tatacuyAbi from "./abi/tatacuyAbi";

declare var __tatacuyAddress__: string;
declare var __chainId__: string;

interface SignerData extends TypedDataSigner {
    _address: string;
}

var tatacuyAddress = __tatacuyAddress__;
var chainId = __chainId__;
var provider: providers.Web3Provider = null;
var tatacuyContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initTatacuy(_provider: providers.ExternalProvider): Contract[] {
    provider = new providers.Web3Provider(_provider);
    tatacuyContract = new Contract(tatacuyAddress, tatacuyAbi, provider);
    return [tatacuyContract];
}

// All properties on a domain are optional
const domain = {
    name: "Tatacuy Game",
    version: "alpha",
    chainId: "97",
    verifyingContract: "0x5571780676d7D3C9498ac5Ae89089e3168923D5D",
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
 */
export async function signTatacuyTxAndVerify(
    _signer: SignerData,
    _guineaPigUuid: number,
    _likelihood: number,
    _pachaOwner: string,
    _pachaUuid: number
): Promise<boolean> {
    // Signing the transaction
    value.guineaPig = String(_guineaPigUuid);
    value.wallet = _signer._address;
    value.likelihood = String(_likelihood);
    var signature = await _signer._signTypedData(domain, types, value);

    // Validating in Cloud
    var url =
        "https://api.defender.openzeppelin.com/autotasks/3da214c4-a2e1-407b-8f83-7227ff917f0e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/8oR97h8mCyzteR52LJqcNm";

    var payload = {
        ...value,
        pachaOwner: _pachaOwner,
        pachaUuid: _pachaUuid,
        signature,
    };
    var data = {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    var res = await fetch(url, data);
    return await res.json();
}

/**
 * @notice A guineapig could win Sami Points after trying luck at a Tatacuy
 * @notice It's executed by a relayer in the cloud upon signature from the user
 * @dev It uses a Random Number Generator by Chainlink and the `_likelihood`
 * @param _account: The address for which random number request has been made
 * @param _pachaOwner: Wallet address of the pacha at which this Tatacuy is placed
 * @param _pachaUuid: Uuid of the pacha received when it was minted
 * @param _tatacuyUuid: Uuid of the Tatacuy received when it was minted
 * @param _likelihood: A number between 1 and 10 in inclusive that represents tha chances of winning
 */
export async function tryMyLuckTatacuy(
    _account: string,
    _pachaOwner: string,
    _pachaUuid: number,
    _tatacuyUuid: number,
    _likelihood: number,
    _signature: string
) { }

/**
 * @dev Finished a Tatacuy campaign and returns the amount of Sami Points remaining in the campaign
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _pachaUuid: Uuid of the pacha assigned when minted. Pacha that will start a Tatacuy game
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function finishTatacuyCampaign(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<number> {
    if (!provider) throw new Error("No provider set");
    var tx = await tatacuyContract
        .connect(_signer)
        .finishTatacuyCampaign(_pachaUuid);
    return await tx.wait(_numberOfConfirmations);
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
interface ITatacuyCampaign {
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
 * @param _account: Wallet address of the user who owns a Tatacuy (hence a Pacha)
 * @param _pachaUuid: Uuid of the pacha when it was minted
 * @returns Gives back an object with the structure of 'ITatacuyCampaign'
 */
export async function getTatacuyInfoForAccount(
    _account: string,
    _pachaUuid: number
): Promise<ITatacuyCampaign> {
    return await tatacuyContract.getTatacuyInfoForAccount(_account, _pachaUuid);
}

/**
 * @dev Starts a Tatacuy Campaign for a particular account and saves its info
 * @dev A user can create as many campaigns as Tatacuys he has
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _pachaUuid: Uuid of the Pacha that will received a Tatacuy
 * @param _tatacuyUuid: Uuid assigned when a Tatacuy was minted
 * @param _totalFundsPcuyDeposited: Total funds (in Sami Points) to be distributed in a Tatacuy campaign
 * @param _ratePcuyToSamiPoints: Total funds (in Sami Points) to be distributed in a Tatacuy campaign
 * @param _totalFundsSamiPoints: Total funds (in Sami Points) to be distributed in a Tatacuy campaign
 * @param _prizePerWinnerSamiPoints: Prize (in Sami Points) to be given to a winner after playing at Tatacuy
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function startTatacuyCampaign(
    _signer: Signer,
    _pachaUuid: number,
    _tatacuyUuid: number,
    _totalFundsPcuyDeposited: number,
    _ratePcuyToSamiPoints: number,
    _totalFundsSamiPoints: number,
    _prizePerWinnerSamiPoints: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await tatacuyContract
        .connect(_signer)
        .startTatacuyCampaign(
            _signer,
            _pachaUuid,
            _tatacuyUuid,
            _totalFundsPcuyDeposited,
            _ratePcuyToSamiPoints,
            _totalFundsSamiPoints,
            _prizePerWinnerSamiPoints
        );
    return await tx.wait(_numberOfConfirmations);
}
