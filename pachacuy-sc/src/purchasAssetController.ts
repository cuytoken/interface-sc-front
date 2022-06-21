import { BigNumber, Contract, ethers, providers, Signer, utils } from "ethers";

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

interface IGuineaPigPurchaseInfo {
    _account: string;
    price: string;
    _guineaPigId: string;
    _uuid: string;
    _raceAndGender: string;
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
): Promise<IGuineaPigPurchaseInfo> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseGuineaPigWithPcuy(_ix);
    var res = await tx.wait(_numberOfConfirmations);
    /**
               * topic
               * event GuineaPigPurchaseFinish(
                  address _account,
                  uint256 price,
                  uint256 _guineaPigId,
                  uint256 _uuid,
                  string _raceAndGender
              );*/
    var topic =
        "0x689ea76b8b7e9b71a268c5f9369dfca8f94fac614351077804bc004b6ddf3258";
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    res = utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "uint256", "string"],
        data
    );
    return {
        _account: res[0],
        price: res[1].toString(),
        _guineaPigId: res[2].toString(),
        _uuid: res[3].toString(),
        _raceAndGender: res[4],
    };
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
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function purchaseLandWithPcuy(
    _location: number,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseLandWithPcuy(_location);
    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data).toString();
        }
    }
    return ethers.BigNumber.from(0).toString();
}

/**
 * @notice Purchases a Pacha Pass from a pacha that exists
 * @param _pachaUuid: A pacha's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @return the uuid of the pacha pass
 */
export async function purchasePachaPass(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchasePachaPass(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data).toString();
        }
    }
    return ethers.BigNumber.from(0).toString();
}

export async function purchaseChakra(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    var tx = await pacContract.connect(_signer).purchaseChakra(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data).toString();
        }
    }
    return ethers.BigNumber.from(0).toString();
}

interface IPurchaseFoodInfo {
    feedingDate: string;
    burningDate: string;
    owner: string;
}
export async function purchaseFoodFromChakra(
    _signer: Signer,
    _chakraUuid: number,
    _amountFood: number,
    _guineaPigUuid: number,
    _numberOfConfirmations: number = 1
): Promise<IPurchaseFoodInfo> {
    var tx = await pacContract
        .connect(_signer)
        .purchaseFoodFromChakra(_chakraUuid, _amountFood, _guineaPigUuid);
    var res = await tx.wait(_numberOfConfirmations);

    // GuineaPigFed(uint256 daysUntilHungry, uint256 daysUntilDead, address owner)
    var topic =
        "0xf7eceeb5da176904867fe5b715b28fa40d1ba596bf629316ab3f0a31f067afb5";
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    res = utils.defaultAbiCoder.decode(["uint256", "uint256", "address"], data);
    return {
        feedingDate: res[0].toString(),
        burningDate: res[1].toString(),
        owner: res[2],
    };
}

/**
 * @param uuidTicket: All tickets from the a Misay Wasi have the same Uuid
 * @param amountOfTickets: Total amount of tickets purchased at a Misay Wasi
 */
interface IPurchaseResult {
    uuidTicket: string;
    amountOfTickets: string;
}
/**
 *
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _misayWasiUuid: Uuid of the Misay Wasi when it was minted
 * @param _amountOfTickets: Amount of tickets to be purchased from the Misay Wasi
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 * @return
 */
export async function purchaseTicketFromMisayWasi(
    _signer: Signer,
    _misayWasiUuid: number,
    _amountOfTickets: number,
    _numberOfConfirmations: number = 1
): Promise<IPurchaseResult> {
    var tx = await pacContract
        .connect(_signer)
        .purchaseTicketFromMisayWasi(_misayWasiUuid, _amountOfTickets);
    var res = await tx.wait(_numberOfConfirmations);

    var topic = // UuidAndAmount (uint256 uuid, uint256 amount)
        "0x242425d5071d5eaaf8f6f82889dd13cdd464fc74ff50b8c6a1c85780e8958c3f";
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    res = utils.defaultAbiCoder.decode(["uint256", "uint256"], data);
    return {
        uuidTicket: res[0].toString(),
        amountOfTickets: res[1].toString(),
    };
}

export async function purchaseMisayWasi(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseMisayWasi(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);

    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data).toString();
        }
    }
    return ethers.BigNumber.from(0).toString();
}

////////////////////////
///    Qhatu Wasi    ///
////////////////////////

export async function purchaseQhatuWasi(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseQhatuWasi(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);

    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            return ethers.BigNumber.from(ev.data).toString();
        }
    }
    return ethers.BigNumber.from(0).toString();
}
