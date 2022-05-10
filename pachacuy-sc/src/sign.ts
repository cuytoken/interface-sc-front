import { TypedDataSigner } from "@ethersproject/abstract-signer";

declare var __tatacuyAddress__: string;
declare var __chainId__: string;

interface Signer extends TypedDataSigner {
    _address: string;
}

var tatacuyAddress = __tatacuyAddress__;
var chainId = __chainId__;

// All properties on a domain are optional
const domain = {
    name: "Tatacuy Game",
    version: "alpha",
    chainId,
    verifyingContract: tatacuyAddress,
};

// The named list of all type definitions
const types = {
    TatacuyGame: [
        { name: "context", type: "string" },
        { name: "player", type: "address" },
        { name: "wallet", type: "string" },
        { name: "likelihood", type: "string" },
    ],
};

// The data to sign
const value = {
    context: "Winning Sami Points at Tatacuy",
    player: "",
    wallet: "",
    likelihood: "",
};

export async function signTatacuyTransaction(
    signer: Signer,
    player = signer._address,
    wallet = signer._address,
    likelihood: number,
) {
    value.player = player;
    value.wallet = wallet;
    value.likelihood = String(likelihood);
    return await signer._signTypedData(domain, types, value);
}
