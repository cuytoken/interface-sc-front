import { BigNumber, Contract, ethers, providers, Signer } from "ethers";
/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: obtained from 'new providers.Web3Provider(window.ethereum);'
 */
export declare function init(_provider: providers.ExternalProvider): Contract[];
/**
 * @dev Function that approves the smart contract to operate the user's funds
 * @param _amount: Amount to be approved in favor of the smart contract
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function approveBusd(_amount: BigNumber, _signer: Signer, _numberOfConfirmations?: number): Promise<any>;
/**
 * @dev Function that finds the allowance give in favor of the smart contract
 * @param _account: Wallet address of the user
 */
export declare function allowance(_account: string): Promise<BigNumber>;
/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 BUSD, 2 -> 10 BUSD, 3 -> 15 BUSD)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function purchaseGuineaPigWithBusd(_ix: number, _signer: Signer, _numberOfConfirmations?: number): Promise<void>;
/**
 * @notice A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 * rate PCUY, 2 -> 10 * rate PCUY, 3 -> 15 * rate PCUY)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function purchaseGuineaPigWithPcuy(_ix: number, _signer: Signer, _numberOfConfirmations?: number): Promise<void>;
/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchaseLandWithBusd(_location: number, _signer: Signer): Promise<void>;
/**
 * @notice Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Numbers go from 1 to 697
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchaseLandWithPcuy(_location: number, _signer: Signer): Promise<void>;
/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchasePachaPassWithPcuy(_landUuid: number, _signer: Signer): Promise<void>;
/**
 * @notice Purchases a Pacha Pass from a land that exists
 * @param _landUuid: A land's uuid for which the pacha pass will be purchased
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchasePachaPassWithBusd(_landUuid: number, _signer: Signer): Promise<void>;
/**
 * @notice Finds out if a visitor has access to a particular pacha
 * @param _visitorAddress: Visitor address to verify if he has access
 * @param _landUuid: A uuid of a land that will be checked against the visitor's access
 */
export declare function isGuineaPigAllowedInPacha(_visitorAddress: string, _landUuid: number): Promise<boolean>;
/**
 * @param guineaPigs: list of uuids of each guinea pig owned by the user
 * @param lands: list of uuids of each land owned by the user
 */
interface NftList {
    guineaPigs: number[];
    lands: number[];
    pachaPasses: number[];
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Address of the user
 * @return Three lists of NFTs owned by the user: one for Guinea Pigs, one for Lands and one for Pacha Passes
 */
export declare function getListOfNftsPerAccount(_account: string): Promise<NftList>;
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
export declare function getGuineaPigData(_uuid: number): Promise<IDataGuineaPig | boolean>;
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
export declare function getLandData(_uuid: number): Promise<IDataLand | boolean>;
/**
 *
 * @param _account Wallet address of the user
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that uuid owned by the user
 */
export declare function balanceOf(_account: string, _uuid: number): Promise<number>;
/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that particular uuid
 */
export declare function totalSupply(_uuid: number): Promise<number>;
/**
 *
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the ipfs prefix that contains the NFT's data
 */
export declare function tokenURI(_uuid: number): Promise<string>;
/**
 * @param guineaPigs array of uuid for each Puinea Pig.
 * @param lands array of uuid for each Pacha.
 * @param pachaPasses array of uuid for each Pacha Pass.
 * @param tokenBalance shows the balance of Pacha Cuy tokens for this wallet
 */
interface IWalletInfo {
    guineaPigs: number[];
    lands: number[];
    pachaPasses: number[];
    tokenBalance: ethers.BigNumber;
}
/**
 *
 * @param _account: Wallet address of the user
 * @returns Returns a type of IWalletInfo that contains information about the wallee of the player
 */
export declare function getWalletData(_account: string): Promise<IWalletInfo>;
/**
 * @param pachaId: Pacha's ID (unique identifier) to which the Pacha Pass belongs to
 * @param owner: Wallet address of the Pacha Pass owner
 * @param cost: Amount of tokens paid to get the Pacha Pass
 * @param transferMode: One of the following: 'purchased'(when public pachapass) or 'transferred'(when private pacha).
 */
interface IPachaPass {
    isPachaPass: boolean;
    pachaUuid: number;
    typeOfDistribution: number;
    uuid: number;
    cost: number;
    transferMode: "purchased" | "transferred";
}
/**
 *
 * @param _uuid Pacha Pass' uuid given when it was minted
 * @returns Returns a type of IPachaPass object that contains information about the Pacha Pass properties
 */
export declare function getPachaPassData(_uuid: number): Promise<IPachaPass | boolean>;
export {};
