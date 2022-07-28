import { utils } from "ethers";
declare var __rpcUrlAlchemy__: string;

declare let window: {
    ethereum: any;
};

const networkMap = {
    MUMBAI_TESTNET: {
        chainId: utils.hexValue(80001), // '0x13881'
        chainName: "Mumbai (Polygon) Testnet",
        nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
        rpcUrls: [__rpcUrlAlchemy__],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
};

export async function connectToMumbai() {
    if (window.ethereum) {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkMap.MUMBAI_TESTNET],
        });
    } else {
        console.log("Not Metamask detected");
    }
}
