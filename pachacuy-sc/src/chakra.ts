import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import chakraAbi from "./abi/chakraAbi";

declare var __chakraAddress__: string;
declare var __chainId__: string;

var chakraAddress = __chakraAddress__;
var provider: providers.Web3Provider = null;
var chakraContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initChakra(_provider: providers.ExternalProvider): Contract[] {
    provider = new providers.Web3Provider(_provider);
    chakraContract = new Contract(chakraAddress, chakraAbi, provider);
    return [chakraContract];
}

/**
 * @dev Details the information of a Tatacuy. Additional properties attached for its campaign
 * @param owner: Wallet address of the current owner of the Tatacuy
 * @param chakraUuid: Uuid of the chakra when it was minted
 * @param pachaUuid: Uuid of the pacha where the chakra belongs to
 * @param creationDate: Date when the chakra was minted
 * @param prizeOfChakra: Price in PCUY of the chakra NFT
 * @param prizePerFood: Price in PCUY to pay for each food by the Guinea Pig
 * @param totalFood: Number of food to be purchased from chakra
 * @param availableFood: Amount of food available to sell. Decrease one by one as Guinea Pig purchase food
 * @param hasChakra: Indicates wheter a chakra exists or not
 */
interface ChakraInfo {
    owner: string;
    chakraUuid: number;
    pachaUuid: number;
    creationDate: number;
    prizeOfChakra: number;
    prizePerFood: number;
    totalFood: number;
    availableFood: number;
    hasChakra: boolean;
}

export async function getChakraWithUuid(
    _chakraUuid: number
): Promise<ChakraInfo> {
    return await chakraContract.getChakraWithUuid(_chakraUuid);
}

export async function getListOfChakrasWithFood(): Promise<ChakraInfo[]> {
    return await chakraContract.getListOfChakrasWithFood();
}

/**
 * @param _signer: Signer of the transaction(provider.getSigner(account))
 * @param _chakraUuid: Uuid of chakra where food is being purchased
 * @param _pricePerFood: Price of food to be set by the owner of chakra
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function updateFoodPriceAtChakra(
    _signer: Signer,
    _chakraUuid: number,
    _pricePerFood: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await chakraContract
        .connect(_signer)
        .updateFoodPriceAtChakra(_chakraUuid, _pricePerFood);
    return await tx.wait(_numberOfConfirmations);
}
