import { utils } from "ethers";
declare var __rpcUrlAlchemy__: string;

declare let window: {
    ethereum: any;
};

const networkMap = {
    ALCHEMY_POLYGON_URL: {
        chainId: utils.hexValue(80001), // '0x13881'
        chainName: "Mumbai (Polygon) Testnet",
        nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
        rpcUrls: [__rpcUrlAlchemy__],
        blockExplorerUrls: [
            "https://polygon-mainnet.g.alchemy.com/v2/2mTUO_-mP_Ya2UUSKvX-inM7YpPtTW6k",
        ],
    },
};

export async function connectToMumbai() {
    if (window.ethereum) {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkMap.ALCHEMY_POLYGON_URL],
        });
    } else {
        console.log("Not Metamask detected");
    }
}
