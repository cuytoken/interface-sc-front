```typescript
import { Contract, providers, Signer } from "ethers";
/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: obtained from 'new providers.Web3Provider(window.ethereum);'
 */
export declare function initMarketplace(
  _provider: providers.ExternalProvider
): Contract[];
/**
 * @dev Function that approves the smart contract to operate the user's funds
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function givePermission(
  _signer: Signer,
  _numberOfConfirmations?: number
): Promise<[any, any]>;
interface ITraitType {
  trait_type: string;
  value: string;
}
interface INftAttributes {
  name: string;
  description: string;
  image: string;
  attributes: ITraitType[];
}
interface INftResponse extends INftAttributes {
  contractAddress: string;
  tokenID: string;
  imageUrl: string;
}
/**
 * @dev List all NFTs from an account (inlcudes ERC1155 and ERC721)
 * @param _account: wallet address from which is going to query the NFTs
 */
export declare function listNftsOfAccount(
  _account: string
): Promise<INftResponse[]>;
/**
 * @param nftOwner: wallet address owner of the NFT
 * @param smartContract: smart contract to which this NFT belongs to
 * @param uuid: unique identifier provided when the NFT was minted
 * @param price: amount in PCUS set up by the owner when it was listed
 * @param listed: boolean that indicates whether an NFT is listed or not. All items here must be true
 */
interface INftItem {
  nftOwner: string;
  smartContract: string;
  uuid: number;
  price: number;
  listed: boolean;
}
/**
 * @notice returns the list of all NFTs for sale that have been approved
 * @return INftItem
 */
export declare function getListOfNftsForSale(): Promise<INftItem[]>;
/**
 * @notice returns the list of all NFTs for sale that have been approved
 * @param _smartContractAddress smart contract to which the NFT belongs to
 * @param _account wallet address for which the permissino is going to be checked against
 */
export declare function isMarketPlaceAllowed(
  _smartContractAddress: string,
  _account: string
): Promise<boolean>;
/**
 * @dev changes the price of a NFT
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _smartContractAddress: address to which the NFT belongs to
 * @param _uuid: unique identifier of the NFT when it was minted
 * @param _newPrice: new price to change for the NFT listing
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function changePriceOfNft(
  _signer: Signer,
  _smartContractAddress: string,
  _uuid: number,
  _newPrice: number,
  _numberOfConfirmations?: number
): Promise<any>;
/**
 * @dev purchase NFT by using $BUSD
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _smartContractAddress: address to which the NFT belongs to
 * @param _uuid: unique identifier of the NFT when it was minted
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function purchaseNftWithBusd(
  _signer: Signer,
  _smartContractAddress: string,
  _uuid: number,
  _numberOfConfirmations?: number
): Promise<any>;
/**
 * @dev purchase NFT by using $PCUY
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _smartContractAddress: address to which the NFT belongs to
 * @param _uuid: unique identifier of the NFT when it was minted
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function purchaseNftWithPcuy(
  _signer: Signer,
  _smartContractAddress: string,
  _uuid: number,
  _numberOfConfirmations?: number
): Promise<any>;
/**
 * @dev Function that set price of NFT and list it
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _smartContractAddress: address to which the NFT belongs to
 * @param _uuid: unique identifier of the NFT when it was minted
 * @param _price: amount in PCUY set up by the owner of the NFT
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export declare function setPriceAndListAsset(
  _signer: Signer,
  _smartContractAddress: string,
  _uuid: number,
  _price: number,
  _numberOfConfirmations?: number
): Promise<any>;
export {};
```
