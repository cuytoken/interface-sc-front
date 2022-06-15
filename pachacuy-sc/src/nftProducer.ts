import { BigNumber, Contract, ethers, providers, Signer } from "ethers";

import nftpAbi from "./abi/nftpAbi";

declare var __nftpAddress__: string;

var provider: providers.Web3Provider = null;
export var nftpContract: Contract;

var nftpAddress = __nftpAddress__;

export function initNftProducer(
    _provider: providers.ExternalProvider
): Contract {
    provider = new providers.Web3Provider(_provider);
    nftpContract = new Contract(nftpAddress, nftpAbi, provider);
    return nftpContract;
}
/**
 *
 * @param isGuineaPig Indicates wheter the NFT is a Guinea Pig or not
 * @param race Guinea Pig's race assigned when the cuy was minted
 * @param gender Guinea Pig's gender assigned when the cuy was minted
 * @param speed Walking velocity of the Guinea Pig given when it was minted.
 * @param daysUntilHungry Number of days that Guinea Pig do not need food
 * @param daysUntilDeath Number of days that Guinea Pig will survive without food
 * @param samiPoints It's like cash back. For every token spent, a percentage is given back to the spender.
 * @param uuid Unique identifier of the Guinea Pig given when it was minted.
 * @param idForJsonFile Indicates the index of the NFT in the JSON file.
 * @param feedingDate Represents the timestamp limit when the Guinea Pig needs food. Otherwise it will die.
 * @param burningDate Represents the timestamp of the additional three days given on top of 'feedingDate'. After that the NFT is burned.
 * @param wasBorn Time when the Guinea Pig was born.
 * @param owner Wallet address of the Guinea Pig owner.
 *
 */
interface IDataGuineaPig {
    isGuineaPig: boolean;
    race: string;
    gender: string;
    speed: number;
    daysUntilHungry: number;
    daysUntilDeath: number;
    samiPoints: number;
    uuid: number;
    idForJsonFile: number;
    feedingDate: number;
    burningDate: number;
    wasBorn: number;
    owner: string;
}
/**
 *
 * @param _uuid Guinea Pig's uuid given when it was minted
 * @returns Returns a type of IDataguineaPig object that contains information about the Guinea Pig's properties
 */
export async function getGuineaPigData(
    _uuid: number
): Promise<IDataGuineaPig | boolean> {
    var guineaPigData: IDataGuineaPig = await nftpContract.getGuineaPigData(
        _uuid
    );
    return guineaPigData.isGuineaPig
        ? {
            ...guineaPigData,
        }
        : false;
}

/**
 *
 * @param isLand Indicates wheter the NFT is a Land or not
 * @param isPublic Indicates wheter the Land is public or private
 * @param uuid Unique identifier when the Land was minted
 * @param location Number from 1 to 697 indicating a location
 * @param idForJsonFile Indicates the index of the NFT in the JSON file.
 * @param wasPurchased Time when the Land was purchased.
 */
interface IDataLand {
    isLand: boolean;
    isPublic: boolean;
    uuid: number;
    location: number;
    idForJsonFile: number;
    wasPurchased: number;
}
/**
 *
 * @param _uuid Lands's uuid given when it was minted
 * @returns Returns a type of IDataLand object that contains information about Land's properties
 */
export async function getLandData(_uuid: number): Promise<IDataLand | boolean> {
    var landData: IDataLand = await nftpContract.getLandData(_uuid);
    return landData.isLand ? { ...landData } : false;
}

/**
 *
 * @param _account Wallet address of the user
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that uuid owned by the user
 */
export async function balanceOf(
    _account: string,
    _uuid: number
): Promise<number> {
    return await nftpContract.balanceOf(_account, _uuid);
}

/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that particular uuid
 */
export async function totalSupply(_uuid: number): Promise<number> {
    return await nftpContract.totalSupply(_uuid);
}

/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the ipfs prefix that contains the NFT's data
 */
export async function tokenURI(_uuid: number): Promise<string> {
    var pinata = "https://gateway.pinata.cloud/ipfs/";

    var prefix = await nftpContract.tokenURI(_uuid);
    prefix = prefix.split("//")[1];

    var data: any = await fetch(`${pinata}${prefix}`);
    data = await data.json();
    var image = data.image;
    image = image.split("//")[1];

    return `${pinata}${image}`;
}

////////////////////////
///      PACHA       ///
////////////////////////
/**
 * @notice Indicates whether a Guinea Pig is allows to enter a Pacha
 * @param _account Wallet to be validated against the Pacha
 * @param _pachaUuid Uuid of the pacha to check the access of _account
 * @return a boolean indicating if _account has access or not
 */
export async function isGuineaPigAllowedInPacha(
    _account: string,
    _pachaUuid: number
): Promise<boolean> {
    return await nftpContract.isGuineaPigAllowedInPacha(_account, _pachaUuid);
}

////////////////////////
///     PACHAPASS    ///
////////////////////////
/**
 * @notice Mints a Pacha Pass when the Pacha has chose typeDistribution = 1 (no public sale)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _accounts: list of wallet address that will receive a pacha pass
 * @param _pachaUuid: uuid of the Pacha from where the Pacha Passes will be minted
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 * @return the Uuid of the pacha pass that was minted
 */
export async function mintPachaPassAsOwner(
    _signer: Signer,
    _accounts: string[],
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    var tx = await nftpContract
        .connect(_signer)
        .mintPachaPassAsOwner(_accounts, _pachaUuid);
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
///     TATACUY      ///
////////////////////////
export async function mintTatacuy(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    var tx = await nftpContract.connect(_signer).mintTatacuy(_pachaUuid);
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
///     Wiracocha    ///
////////////////////////
export async function mintWiracocha(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    var tx = await nftpContract.connect(_signer).mintWiracocha(_pachaUuid);
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

export async function burnChakra(
    _signer: Signer,
    _chakraUuid: number,
    _numberOfConfirmations: number = 1
) {
    var tx = await nftpContract.connect(_signer).burnChakra(_chakraUuid);
    return await tx.wait(_numberOfConfirmations);
}

////////////////////////
///    Hatun Wasi    ///
////////////////////////
export async function mintHatunWasi(
    _signer: Signer,
    _pachaUuid: number,
    _numberOfConfirmations: number = 1
): Promise<string> {
    var tx = await nftpContract.connect(_signer).mintHatunWasi(_pachaUuid);
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

export async function getListOfUuidsPerAccount(_account: string): Promise<any> {
    try {
        var { _listOfUuids, _listOfTypes } =
            await nftpContract.getListOfUuidsPerAccount(_account);
    } catch (error) {
        console.log("getListOfUuidsPerAccount error", error);
    }

    return {
        _listOfUuids,
        _listOfTypes,
    };
}
