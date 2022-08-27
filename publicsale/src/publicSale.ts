import { Contract, providers, Signer, utils } from "ethers";
import { formatEther } from "ethers/lib/utils";

import publicAbi from "./abi/publicAbi";

declare var __publicSaleAddress__: string;

var publicSaleAddress = __publicSaleAddress__;
var provider: providers.Web3Provider;
var publicSaleContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initPublicSale(
    _provider: providers.ExternalProvider
): Contract {
    provider = new providers.Web3Provider(_provider);
    publicSaleContract = new Contract(publicSaleAddress, publicAbi, provider);
    return publicSaleContract;
}

interface IPcuyPurchased {
    purchaser: string;
    usdcAmount: string;
    pcuyPurchased: string;
    pcuyVesting: string;
};

/**
 * @notice Purchase PCUY tokens by using USDC
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _usdcAmount: Amount of USDC to purchase
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchasePcuyWithUsdc(
    _signer: Signer,
    _usdcAmount: number,
    _numberOfConfirmations: number = 1
): Promise<IPcuyPurchased> {
    if (!provider) throw new Error("No provider set");
    var tx = await publicSaleContract
        .connect(_signer)
        .purhcasePcuyWithUsdc(_usdcAmount);
    var res = await tx.wait(_numberOfConfirmations);

    var event =
        "event PcuyPurchased(address purchaser, uint256 usdcAmount, uint256 pcuyPurchased, uint256 pcuyVesting)";
    var iface = new utils.Interface([event]);
    var topic = iface.getEventTopic("PcuyPurchased");
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded = utils.defaultAbiCoder.decode(
        [
            "address",
            "uint256",
            "uint256",
            "uint256",
        ],
        data
    );
    return {
        purchaser: dataDecoded[0],
        usdcAmount: formatEther(dataDecoded[1]),
        pcuyPurchased: formatEther(dataDecoded[2]),
        pcuyVesting: formatEther(dataDecoded[3]),
    }
}

export async function exchangeRateUsdcToPcuy(): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var res = await publicSaleContract.exchangeRateUsdcToPcuy();
    return res.toString();
}

export async function totalPcuySold(): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var res = await publicSaleContract.totalPcuySold();
    return res.toString();
}

export async function totalPcuyVesting(): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var res = await publicSaleContract.totalPcuyVesting();
    return res.toString();
}

export async function totalUsdcRaised(): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var res = await publicSaleContract.totalUsdcRaised();
    return res.toString();
}

export async function walletForFunds(): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var res = await publicSaleContract.walletForFunds();
    return res.toString();
}
