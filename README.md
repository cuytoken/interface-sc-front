```javascript
var {
  // init
  approveBusd,
  allowance,
  init,
  // purchase
  purchaseGuineaPigWithBusd,
  purchaseGuineaPigWithPcuy,
  purchaseLandWithBusd,
  purchaseLandWithPcuy,
  purchasePachaPassWithPcuy,
  purchasePachaPassWithBusd,
  // get NFT data
  getGuineaPigData,
  getLandData,
  getPachaPassData,
  getWalletData,
  // helpers
  isGuineaPigAllowedInPacha,
  getListOfNftsPerAccount,
  balanceOf,
  totalSupply,
  tokenURI,
} = require("pachacuy-sc");
```

```typescript
import { BigNumber, Contract, ethers, providers, Signer } from "ethers";
export declare function init(_provider: providers.ExternalProvider): Contract[];
export declare function approveBusd(
  amount: BigNumber,
  _signer: Signer
): Promise<void>;
/**
 * @note A user cannot purchase more than one NFT at a time.
 * @param _ix: Price index to purchase (1 -> 5 BUSD, 2 -> 10 BUSD, 3 -> 15 BUSD)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchaseGuineaPigWithBusd(
  _ix: number,
  _signer: Signer
): Promise<void>;
/**
 * @note Numbers go from 1 to 697. A usar cannot purchase the same location twice
 * @param _location: Price index to purchase (1 -> 5 BUSD, 2 -> 10 BUSD, 3 -> 15 BUSD)
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 */
export declare function purchaseLandWithBusd(
  _location: number,
  _signer: Signer
): Promise<void>;
/**
 * @param guineaPigs: list of uuids of each guinea pig owned by the user
 * @param lands: list of uuids of each land owned by the user
 */
interface NftList {
  guineaPigs: number[];
  lands: number[];
}
/**
 * @dev Get's a list of all the NFTs owned by the user separated in two arrays
 * @param _account: Address of the user
 * @return Two lists of NFTs owned by the user: one for Guinea Pigs and one for Lands
 */
export declare function getListOfNftsPerAccount(
  _account: string
): Promise<NftList>;
/**
 *
 * @param isGuineaPig Indicates wheter the NFT is a Guinea Pig or not
 * @param race Guinea Pig's race assigned when the cuy was minted
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
  race: number;
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
export declare function getGuineaPigData(
  _uuid: number
): Promise<IDataGuineaPig>;
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
export declare function getLandData(_uuid: number): Promise<IDataLand>;
/**
 *
 * @param _account Wallet address of the user
 * @param _uuid NFT's uuid given when it was minted
 * @returns Returns the amount of NFTs of that uuid owned by the user
 */
export declare function balanceOf(
  _account: string,
  _uuid: number
): Promise<number>;
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
export {};
```

**CHANGELOGS**
<u>0.0.4</u>

- `race` was added to `IDataGuineaPig`
- `tokenBalance` was added to `IWalletInfo`
- `privacy` and `location` was added to `IPachaData`
