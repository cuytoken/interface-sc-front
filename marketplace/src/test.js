var { Contract, providers, Signer } = require("ethers");
var axios = require("axios");
var { getListOfNftsPerAccount } = require("pachacuy-sc");

var nftMocheAbi = require("./abi/nftMoche");
var nftMocheAddress = "0x9af90A0fFFbe809DC4e738fB2713FF3E53B045e6";
var provider = new providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
var nftMocheContract = new Contract(nftMocheAddress, nftMocheAbi, provider);

async function main() {
  var nftMocheAddress = "0x9af90A0fFFbe809DC4e738fB2713FF3E53B045e6";
  var contractAddress = nftMocheAddress;
  var walletAddress = "0xa6b2fa18d3e746d3012dabc21e63bcc35e638897";
  var _account = walletAddress;
  var url = `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${walletAddress}&sort=asc`;
  var [{ data }] = await Promise.all([axios(url)]);

  //   return;
  var nfts = data.result.filter(
    (el) =>
      // filter by smart contract
      el.contractAddress == nftMocheAddress.toLowerCase() &&
      // filter by receiver ('to' must be walletAddress)
      el.to == walletAddress.toLowerCase()
  );

  // remove - list of nfts sent out by wallet address
  var nftsToRemove = data.result.filter(
    (el) => el.from == walletAddress.toLowerCase()
  );

  for (var i = 0; i < nftsToRemove.length; i++) {
    var idToRemove = nftsToRemove[i].tokenID;
    nfts = nfts.filter((el) => el.tokenID != idToRemove);
  }

  var pinata = "https://ipfs.io/ipfs/";

  var erc721tokenIds = nfts.map((el) => el.tokenID);
  var erc721Promises = erc721tokenIds.map((el) =>
    nftMocheContract.tokenURI(el)
  );
  var tokenUris = await Promise.all(erc721Promises);
  var prefixesPromises = tokenUris.map((el) =>
    axios(`${pinata}${el.split("//")[1]}`)
  );
  var urls = await Promise.all(prefixesPromises);
  var pinata = "https://gateway.pinata.cloud/ipfs/";
  var urlImagesPrefixes = urls.map(
    (el) => `${pinata}${el.data.image.split("//")[1]}`
  );
  console.log(urlImagesPrefixes);
}

main();
