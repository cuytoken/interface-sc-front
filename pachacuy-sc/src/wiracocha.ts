import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import wiracochaAbi from "./abi/wiracochaAbi";

declare var __wiracochaAddress__: string;
declare var __chainId__: string;
declare var __webhookWiracocha__: string;
declare var __version__: string;

interface SignerData extends TypedDataSigner {
    _address: string;
}

var wiracochaAddress = __wiracochaAddress__;
var chainId = __chainId__;
var version = __version__;
var webhookWiracocha = __webhookWiracocha__;
var provider: providers.Web3Provider = null;
var wiracochaContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initWiracocha(
    _provider: providers.ExternalProvider
): Contract {
    provider = new providers.Web3Provider(_provider);
    wiracochaContract = new Contract(wiracochaAddress, wiracochaAbi, provider);
    return wiracochaContract;
}

// All properties on a domain are optional
var domain = {
    name: "Wiracocha",
    version,
    chainId,
    verifyingContract: wiracochaAddress,
};

// The named list of all type definitions
var types = {
    TatacuyGame: [
        { name: "context", type: "string" },
        { name: "guineaPig", type: "string" },
        { name: "wallet", type: "address" },
        { name: "pachaUuid", type: "string" },
        { name: "samiPoints", type: "string" },
    ],
};

// The data to sign
var value = {
    context: "Exchanging Sami Points to PCUYs",
    guineaPig: "",
    wallet: "",
    pachaUuid: "",
    samiPoints: "",
};

/**
 * @notice Signs a transaction for exchanging Sami Points by Pacuy tokens
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _guineaPigUuid: Guinea Pig uuid (when minted) that is trying exchange
 * @param _samiPoints: Sami points to be exchanged by a Guinea Pig at Wiracocha
 * @param _pachaUuid: Uuid of the pacha when it was minted
 * @param _wiracochaUuid: Uuid of the Wiracocha when it was minted
 * @param _timeStampFront: Timestamp used to be evaluated at backend to determine if guinea pig is exchanging at Wiracocha
 */
export async function signWiracochaTxAndReceivePcuy(
    _signer: SignerData,
    _guineaPigUuid: number,
    _samiPoints: number,
    _pachaUuid: number,
    _timeStampFront: number,
    _wiracochaUuid: number
): Promise<boolean> {
    // Signing the transaction
    value.guineaPig = String(_guineaPigUuid);
    value.wallet = _signer._address;
    value.pachaUuid = String(_pachaUuid);
    value.samiPoints = String(_samiPoints);
    var signature = await _signer._signTypedData(domain, types, value);

    var payload = {
        ...value,
        wiracochaUuid: _wiracochaUuid,
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
    var res = await fetch(webhookWiracocha, data);
    return await res.json();
}

export interface WiracochaInfo {
    owner: string;
    wiracochaUuid: number;
    pachaUuid: number;
    creationDate: number;
    amountPcuyExchanged: number;
    hasWiracocha: boolean;
}
export async function getWiracochaWithUuid(
    _wiracochaUuid: number
): Promise<WiracochaInfo> {
    return wiracochaContract.getWiracochaWithUuid(_wiracochaUuid);
}

/**
 * @notice Fired after a guinea pig gives sami points and gets back PCUY tokens
 * @param exchanger: wallet address of the guinea pig exchanging Sami Points to PCUY tokens
 * @param pachaOwner: wallet addres of the pacha owner
 * @param pachaUuid: uuid of the pacha when it was minted
 * @param amountPcuy: amount of PCUY tokens gained as a result of the exchanged
 * @param totalPcuyBalance: total PCUY tokens of the exchanger's wallet address
 * @param samiPoints: samit points to be given
 * @param ratePcuyToSami: rate applied to exchange PCUY to Sami
 */
export interface WiracochaExchange {
    exchanger: string;
    pachaOwner: string;
    pachaUuid: number;
    amountPcuy: number;
    totalPcuyBalance: number;
    samiPoints: number;
    ratePcuyToSami: number;
}
