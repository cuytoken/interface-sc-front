import { Contract, providers, Signer, utils } from "ethers";

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
): Contract {
    provider = new providers.Web3Provider(_provider);
    qhatuWasiContract = new Contract(qhatuWasiAddress, qhatuWasiAbi, provider);
    return qhatuWasiContract;
}

/**
 * @note Fired when a Qhatu Wasi campaign is started
 * @param campaignTax: Tax paid by to the owner of the Qhatu Wasi
 * @param netPcuyDeposited: Net (minus tax) PCUY deposited for the campaign
 * @param samiPointsToGiveAway: Amount of Sami Points equivalent to the Net PCUY tokens deposited
 * @param qhatuWasiuuid: Uuid of the Qhatu Wasi when it was minted
 * @param owner: Owner of the Qhatu Wasi
 * @param prizePerView: Amount in Sami Points to be paid when someone sees the add until the end
 */
interface IStartQhatuWasiCampaign {
    campaignTax: string;
    netPcuyDeposited: string;
    samiPointsToGiveAway: string;
    qhatuWasiuuid: string;
    owner: string;
    prizePerView: string;
}

/**
 *
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _qhatuWasiUuid: Uuid of the Qhatu Wasi when it was minted
 * @param _amountPcuyCampaign: Amount in PCUY to be deposited by the campaign
 * @param _prizePerView: Amount in PCUY to be paid when someone sees the add until the end
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function startQhatuWasiCampaign(
    _signer: Signer,
    _qhatuWasiUuid: number,
    _amountPcuyCampaign: number,
    _prizePerView: number,
    _numberOfConfirmations: number = 1
): Promise<IStartQhatuWasiCampaign> {
    var tx = await qhatuWasiContract
        .connect(_signer)
        .startQhatuWasiCampaign(_qhatuWasiUuid, _amountPcuyCampaign, _prizePerView);

    var res = await tx.wait(_numberOfConfirmations);

    var topic = // event QhatuWasiCampaignStarted(uint256 campaignTax, uint256 netPcuyDeposited, uint256 samiPointsToGiveAway, uint256 qhatuWasiuuid, address owner, uint256 _prizePerView)
        "0x05e6dad6af6902df2ec6193b80842ef17ae4af66cdc66790c146e816c4fbef7d";

    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    res = utils.defaultAbiCoder.decode(
        ["uint256", "uint256", "uint256", "uint256", "address", "uint256"],
        data
    );

    return {
        campaignTax: utils.formatEther(res[0]),
        netPcuyDeposited: utils.formatEther(res[1]),
        samiPointsToGiveAway: res[2].toString(),
        qhatuWasiuuid: res[3].toString(),
        owner: res[4],
        prizePerView: res[5].toString(),
    };
}

export interface QhatuWasiInfo {
    uuid: number;
    pachaUuid: number;
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


export interface PurchaseQhatuWasi {
    owner: string;
    qhatuWasiUuid: number;
    pachaUuid: number;
    qhatuWasiPrice: number;
    creationDate: number;
    balanceConsumer: number;
}