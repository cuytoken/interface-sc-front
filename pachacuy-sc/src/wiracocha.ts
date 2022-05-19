import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import wiracochaAbi from "./abi/wiracochaAbi";

declare var __wiracochaAddress__: string;
declare var __chainId__: string;
declare var __webhookWiracocha__: string;

interface SignerData extends TypedDataSigner {
    _address: string;
}

var wiracochaAddress = __wiracochaAddress__;
var chainId = __chainId__;
var webhookWiracocha = __webhookWiracocha__;
var provider: providers.Web3Provider = null;
var wiracochaContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initWiracocha(
    _provider: providers.ExternalProvider
): Contract[] {
    provider = new providers.Web3Provider(_provider);
    wiracochaContract = new Contract(wiracochaAddress, wiracochaAbi, provider);
    return [wiracochaContract];
}

// All properties on a domain are optional
var domain = {
    name: "Wiracocha",
    version: "alpha",
    chainId: "97",
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
        { name: "amountPcuy", type: "string" },
    ],
};

// The data to sign
var value = {
    context: "Exchanging Sami Points to PCUYs",
    guineaPig: "",
    wallet: "",
    pachaUuid: "",
    samiPoints: "",
    amountPcuy: "",
};


/**
 * @notice Signs a transaction for exchanging Sami Points by Pacuy tokens
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _guineaPigUuid: Guinea Pig uuid (when minted) that is trying exchange
 * @param _samiPoints: Sami points to be exchanged by a Guinea Pig at Wiracocha
 * @param _pachaOwner: Wallet address of the pacha owner
 * @param _pachaUuid: Uuid of the pacha when it was minted
 * @param _amountPcuy: Amount of PCUY to receive
 * @param _rateSamiPointsToPcuy: Exchange rate being applied to convert Sami Points to PCUYs
 */
export async function signWiracochaTxAndReceivePcuy(
    _signer: SignerData,
    _guineaPigUuid: number,
    _samiPoints: number,
    _pachaOwner: string,
    _pachaUuid: number,
    _amountPcuy: number,
    _rateSamiPointsToPcuy: number
): Promise<boolean> {
    // Signing the transaction
    value.guineaPig = String(_guineaPigUuid);
    value.wallet = _signer._address;
    value.pachaUuid = String(_pachaUuid);
    value.samiPoints = String(_samiPoints);
    value.amountPcuy = String(_amountPcuy);
    var signature = await _signer._signTypedData(domain, types, value);

    // Validating in Cloud
    var url = webhookWiracocha;

    var payload = {
        ...value,
        pachaOwner: _pachaOwner,
        rateSamiPointsToPcuy: _rateSamiPointsToPcuy,
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

interface WiracochaInfo {
    owner: string;
    wiracochaUuid: number;
    pachaUuid: number;
    creationDate: number;
    amountPcuyExchanged: number;
    hasWiracocha: boolean;
}
export async function getWiracochaInfoForAccount(
    _account: string,
    _pachaUuid: number
): Promise<WiracochaInfo> {
    return wiracochaContract.getWiracochaInfoForAccount(_account, _pachaUuid);
}