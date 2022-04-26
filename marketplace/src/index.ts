import { Contract, providers, Signer } from "ethers";
import { getListOfNftsPerAccount, tokenURI } from "pachacuy-sc";

import nftMocheAbi from "./abi/nftMoche";

var nftMocheAddress = "0x9af90A0fFFbe809DC4e738fB2713FF3E53B045e6";
var nftGameAddress = "0x1517184267098FE72EAfE06971606Bb311966175";

var provider: providers.Web3Provider = null;

var nftMocheContract: Contract;
var nftGameContract: Contract;

interface IDataScan {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    tokenID: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
}

////////////////////////
///       INIT       ///
////////////////////////
/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: obtained from 'new providers.Web3Provider(window.ethereum);'
 */
export function init(_provider: providers.ExternalProvider): Contract[] {
    provider = new providers.Web3Provider(_provider);
    nftMocheContract = new Contract(nftMocheAddress, nftMocheAbi, provider);
    nftGameContract = new Contract(nftGameAddress, nftMocheAbi, provider);
    return [nftMocheContract, nftGameContract];
}

////////////////////////
///    NFT MOCHE     ///
////////////////////////
/**
 * @dev Function that approves the smart contract to operate the user's funds
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function givePermission(
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await Promise.all([
        await nftMocheContract
            .connect(_signer)
            .setApprovalForAll(nftMocheAddress, true),
        await nftGameContract
            .connect(_signer)
            .setApprovalForAll(nftMocheAddress, true),
    ]);
    return await Promise.all([
        await tx[0].wait(_numberOfConfirmations),
        await tx[1].wait(_numberOfConfirmations),
    ]);
}

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

function fillNftResponseTemplate(): INftResponse {
    return {
        name: "",
        description: "",
        image: "",
        attributes: [],
        contractAddress: "",
        tokenID: "",
        imageUrl: "",
    }
}

export async function listNftsOfAccount(
    _account: string
): Promise<INftResponse[]> {
    // ERC721 only
    var contractAddress = nftMocheAddress;
    var walletAddress = _account;
    var url = `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${walletAddress}&sort=asc`;

    var [data, { guineaPigs, lands, pachaPasses }]: [
        any,
        {
            guineaPigs: number[];
            lands: number[];
            pachaPasses: number[];
        }
    ] = await Promise.all(
        // [erc721, erc1155]
        [fetch(url), getListOfNftsPerAccount(_account)]
    );

    data = await data.json();

    // process data from ERC721
    var nfts = data.result.filter(
        (el: IDataScan) =>
            // filter by smart contract
            el.contractAddress == nftMocheAddress.toLowerCase() &&
            // filter by receiver ('to' must be walletAddress)
            el.to == walletAddress.toLowerCase()
    );

    // remove - list of nfts sent out by wallet address
    var nftsToRemove = data.result.filter(
        (el: IDataScan) => el.from == walletAddress.toLowerCase()
    );

    for (var i = 0; i < nftsToRemove.length; i++) {
        var idToRemove = nftsToRemove[i].tokenID;
        nfts = nfts.filter((el: IDataScan) => el.tokenID != idToRemove);
    }

    // Preparing response array
    var nftResponse: (INftResponse)[] = [];

    // finding tokenURI
    // ERC721
    var pinata = "https://ipfs.io/ipfs/";

    var erc721tokenIds = nfts.map((el: IDataScan) => el.tokenID);
    var erc721Promises = erc721tokenIds.map((_tokenID: string, _ix: number) => {
        nftResponse[_ix] = fillNftResponseTemplate();
        nftResponse[_ix].tokenID = _tokenID;
        nftResponse[_ix].contractAddress = nftMocheContract.address;
        return nftMocheContract.tokenURI(Number(_tokenID));
    });

    // ERC1155
    var _pos = erc721Promises.length;
    var erc1155TokenIds = [...guineaPigs, ...lands, ...pachaPasses];
    var erc1155Promises = erc1155TokenIds.map((_tokenID: number, _ix: number) => {
        nftResponse[_ix + _pos] = fillNftResponseTemplate();
        nftResponse[_ix + _pos].tokenID = String(_tokenID);
        nftResponse[_ix + _pos].contractAddress = nftGameContract.address;
        return nftGameContract.tokenURI(_tokenID);
    });
    // createNftAccounData

    // all token URIs
    var tokenUris: string[] = await Promise.all([
        ...erc721Promises,
        ...erc1155Promises,
    ]);

    // Prepare promises for reading metadata using 'fetch'
    var prefixesPromises = tokenUris.map((el) =>
        fetch(`${pinata}${el.split("//")[1]}`)
    );

    // Retrieve all urls
    var attrJson: any = await Promise.all(prefixesPromises);
    var attributesArray: INftAttributes[] = await Promise.all(
        attrJson.map((data: any) => data.json())
    );
    var pinata = "https://gateway.pinata.cloud/ipfs/";
    attributesArray.forEach((attributes: INftAttributes, _ix: number) => {
        nftResponse[_ix] = { ...nftResponse[_ix], ...attributes };
        nftResponse[_ix].imageUrl = `${pinata}${attributes.image.split("//")[1]}`;
    });

    return nftResponse;
}
