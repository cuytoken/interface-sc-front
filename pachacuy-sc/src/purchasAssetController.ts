import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

import pacAbi from "./abi/pacAbi";

declare var __pacAddress__: string;

var pacAddress = __pacAddress__;
var provider: providers.Web3Provider = null;
var pacContract: Contract;

export function initPurchaseAssetController(
    _provider: providers.ExternalProvider
): Contract {
    provider = new providers.Web3Provider(_provider);
    pacContract = new Contract(pacAddress, pacAbi, provider);
    return pacContract;
}

/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 BUSD, 2 -> 10 BUSD, 3 -> 15 BUSD)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchaseGuineaPigWithBusd(
    _ix: number,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseGuineaPigWithBusd(_ix);
    await tx.wait(_numberOfConfirmations);
}

/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 * rate PCUY, 2 -> 10 * rate PCUY, 3 -> 15 * rate PCUY)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchaseGuineaPigWithPcuy(
    _ix: number,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseGuineaPigWithPcuy(_ix);
    await tx.wait(_numberOfConfirmations);
}

/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchaseLandWithBusd(_location: number, _signer: Signer) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchaseLandWithBusd(_location);
}

/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchaseLandWithPcuy(_location: number, _signer: Signer) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchaseLandWithPcuy(_location);
}

/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchasePachaPassWithPcuy(
    _landUuid: number,
    _signer: Signer
) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchasePachaPassWithPcuy(_landUuid);
}

/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export async function purchasePachaPassWithBusd(
    _landUuid: number,
    _signer: Signer
) {
    if (!provider) throw new Error("No provider set");
    await pacContract.connect(_signer).purchasePachaPassWithBusd(_landUuid);
}

export async function purchaseChakra(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<BigNumber> {
    var tx = await pacContract.connect(_signer).purchaseChakra(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data);
        }
    }
    return ethers.BigNumber.from(0);
}

export async function purchaseFoodFromChakra(
    _signer: Signer,
    _chakraUuid: number,
    _amountFood: number,
    _guineaPigUuid: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await pacContract
        .connect(_signer)
        .purchaseFoodFromChakra(_chakraUuid, _amountFood, _guineaPigUuid);
    return await tx.wait(_numberOfConfirmations);
}

export async function purchaseTicketFromMisayWasi(
    _signer: Signer,
    _misayWasiUuid: number,
    _amountOfTickets: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await pacContract
        .connect(_signer)
        .purchaseTicketFromMisayWasi(_misayWasiUuid, _amountOfTickets);
    return await tx.wait(_numberOfConfirmations);
}

export async function purchaseMisayWasi(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<BigNumber> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseMisayWasi(_pachaUuid);
    var res = tx.wait(_numberOfConfirmations);

    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data);
        }
    }
    return ethers.BigNumber.from(0);
}

////////////////////////
///    Qhatu Wasi    ///
////////////////////////

export async function purchaseQhatuWasi(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<BigNumber> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseQhatuWasi(_pachaUuid);
    var res = tx.wait(_numberOfConfirmations);

    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data);
        }
    }
    return ethers.BigNumber.from(0);
}
