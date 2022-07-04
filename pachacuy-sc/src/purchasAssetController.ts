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

interface IPurchaseLand {
    _account: string;
    uuid: string;
    landPrice: string;
    _location: string;
    poolRewardsAddress: string;
    balanceConsumer: string;
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
): Promise<IPurchaseLand> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchaseLandWithPcuy(_location);
    var res = await tx.wait(_numberOfConfirmations);

    var event =
        "event PurchaseLand(address _account, uint256 uuid, uint256 landPrice, uint256 _location, address poolRewardsAddress, uint256 balanceConsumer)";
    var iface = new ethers.utils.Interface([event]);
    var topic = iface.getEventTopic("PurchaseLand");
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded2 = utils.defaultAbiCoder.decode(
        [
            "address",
            "uint256",
            "uint256",
            "uint256",
            "address",
            "uint256",
        ],
        data
    );

    return {
        _account: dataDecoded2[0],
        uuid: dataDecoded2[1].toString(),
        landPrice: utils.formatEther(dataDecoded2[2]),
        _location: dataDecoded2[3],
        poolRewardsAddress: dataDecoded2[4],
        balanceConsumer: utils.formatEther(dataDecoded2[5]),
    }
}

interface IPurchasePP {
    uuid: string;
    account: string;
    pachaUuid: string;
    pachaPassUuid: string;
    price: string;
    pcuyReceived: string;
    pcuyTaxed: string;
    balanceOwner: string;
    balanceConsumer: string;
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
): Promise<IPurchasePP> {
    if (!provider) throw new Error("No provider set");
    var tx = await pacContract.connect(_signer).purchasePachaPass(_pachaUuid);
    var res = await tx.wait(_numberOfConfirmations);
    var topic =
        "0x9f87cb7b8a6c54debaaa0d12a571441914663d4a4300341e3805f85b854ee337";
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded1 = utils.defaultAbiCoder.decode(["uint256"], data);

    var event =
        "event PurchasePachaPass(address account, uint256 pachaUuid, uint256 pachaPassUuid, uint256 price, uint256 pcuyReceived, uint256 pcuyTaxed, uint256 balanceOwner, uint256 balanceConsumer)";
    var iface = new ethers.utils.Interface([event]);
    var topic = iface.getEventTopic("PurchasePachaPass");
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded2 = utils.defaultAbiCoder.decode(
        [
            "address",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
        ],
        data
    );

    return {
        uuid: dataDecoded1[0].toString(),
        account: dataDecoded2[0],
        pachaUuid: dataDecoded2[1].toString(),
        pachaPassUuid: dataDecoded2[2].toString(),
        price: utils.formatEther(dataDecoded2[3]),
        pcuyReceived: utils.formatEther(dataDecoded2[4]),
        pcuyTaxed: utils.formatEther(dataDecoded2[5]),
        balanceOwner: utils.formatEther(dataDecoded2[6]),
        balanceConsumer: utils.formatEther(dataDecoded2[7]),
    }
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
    chakraUuid: string;
    amountOfFood: string;
    availableFood: string;
    chakraOwner: string;
    pcuyReceived: string;
    pcuyTaxed: string;
    tax: string;
    balanceOwner: string;
    balanceConsumer: string;
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
    var dataDecoded1 = utils.defaultAbiCoder.decode(["uint256", "uint256", "address"], data);

    // event PurchaseFoodChakra(uint256 chakraUuid, uint256 amountOfFood, uint256 availableFood, address chakraOwner, uint256 pcuyReceived, uint256 pcuyTaxed, uint256 tax, uint256 balanceOwner, uint256 balanceConsumer)
    var event =
        "event PurchaseFoodChakra(uint256 chakraUuid, uint256 amountOfFood, uint256 availableFood, address chakraOwner, uint256 pcuyReceived, uint256 pcuyTaxed, uint256 tax, uint256 balanceOwner, uint256 balanceConsumer)";
    var iface = new ethers.utils.Interface([event]);
    var topic = iface.getEventTopic("PurchaseFoodChakra");
    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded2 = utils.defaultAbiCoder.decode(
        [
            "uint256",
            "uint256",
            "uint256",
            "address",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
            "uint256",
        ],
        data
    );

    return {
        feedingDate: dataDecoded1[0].toString(),
        burningDate: dataDecoded1[1].toString(),
        owner: dataDecoded1[2],
        chakraUuid: dataDecoded2[0].toString(),
        amountOfFood: dataDecoded2[1].toString(),
        availableFood: dataDecoded2[2].toString(),
        chakraOwner: dataDecoded2[3],
        pcuyReceived: utils.formatEther(dataDecoded2[4]),
        pcuyTaxed: utils.formatEther(dataDecoded2[5]),
        tax: utils.formatEther(dataDecoded2[6]),
        balanceOwner: utils.formatEther(dataDecoded2[7]),
        balanceConsumer: utils.formatEther(dataDecoded2[8]),
    };
}

/**
 * @param uuidTicket: All tickets from the a Misay Wasi have the same Uuid
 * @param amountOfTickets: Total amount of tickets purchased at a Misay Wasi
 */
interface IPurchaseResult {
    uuidTicket: string;
    amountOfTickets: string;
    misayWasiOwner: string;
    misayWasiUuid: string;
    ticketUuid: string;
    balanceOwner: string;
    balanceConsumer: string;
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

    var event =
        "event UuidAndAmount (uint256 uuid, uint256 amount)";
    var iface = new ethers.utils.Interface([event]);
    var topic = iface.getEventTopic("UuidAndAmount");

    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded1 = utils.defaultAbiCoder.decode(["uint256", "uint256"], data);

    var event =
        "event PurchaseTicket(address misayWasiOwner, uint256 misayWasiUuid, uint256 ticketUuid, uint256 balanceOwner, uint256 balanceConsumer)";
    var iface = new ethers.utils.Interface([event]);
    var topic = iface.getEventTopic("PurchaseTicket");

    var data;
    for (var ev of res.events) {
        if (ev.topics.includes(topic)) {
            data = ev.data;
            break;
        }
    }
    var dataDecoded2 = utils.defaultAbiCoder.decode([
        "address",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
    ], data);

    return {
        uuidTicket: dataDecoded1[0].toString(),
        amountOfTickets: dataDecoded1[1].toString(),
        misayWasiOwner: dataDecoded2[0],
        misayWasiUuid: dataDecoded2[1].toString(),
        ticketUuid: dataDecoded2[2].toString(),
        balanceOwner: utils.formatEther(dataDecoded2[3]),
        balanceConsumer: utils.formatEther(dataDecoded2[4]),
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


////////////////////////
///  PURCHASE EVENTS ///
////////////////////////
export interface PurchaseFoodChakra {
    chakraUuid: string;
    amountOfFood: string;
    availableFood: string;
    chakraOwner: string;
    pcuyReceived: string;
    pcuyTaxed: string;
    tax: string;
    balanceOwner: string;
    balanceConsumer: string;
}

export interface PurchaseLand {
    _account: string;
    uuid: string;
    landPrice: string;
    _location: string;
    poolRewardsAddress: string;
    balanceConsumer: string;
};

export interface PurchasePachaPass {
    account: string;
    pachaUuid: string;
    pachaPassUuid: string;
    price: string;
    pcuyReceived: string;
    pcuyTaxed: string;
    balanceOwner: string;
    balanceConsumer: string;
};

export interface PurchaseTicket {
    misayWasiOwner: string;
    misayWasiUuid: string;
    ticketUuid: string;
    balanceOwner: string;
    balanceConsumer: string;
};