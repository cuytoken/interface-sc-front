var fs = require("fs");
var ethers = require("ethers");
var { readdir, readFile, writeFile } = fs.promises;
var path = "./src/pre-abi";

var nftpAbiList = [
  "TransferBatch",
  "TransferSingle",
  "URI",
  "balanceOf",
  "balanceOfBatch",
  "exists",
  "getGuineaPigData",
  "getLandData",
  "isApprovedForAll",
  "tokenURI",
  "totalSupply",
  "uri",
  "setPachaToPublic",
  "setPachaToPrivateAndDistribution",
  "getListOfNftsPerAccount",
  "isGuineaPigAllowedInPacha",
  "getPachaPassData",
];

var pacAbiList = [
  "GuineaPigPurchaseFinish",
  "GuineaPigPurchaseInit",
  "PurchaseLand",
  "landPrice",
  "purchaseGuineaPigWithBusd",
  "purchaseGuineaPigWithPcuy",
  "purchaseLandWithBusd",
  "purchaseLandWithPcuy",
  "purchasePachaPassWithPcuy",
  "purchasePachaPassWithBusd",
];

var pachacuyAbiList = ["balanceOf"];

async function main() {
  var files = await readdir(path);
  for (var file of files) {
    if (file.includes("Busd")) continue;

    var content = require(path + "/" + file);
    var iface = new ethers.utils.Interface(content);
    var abi = iface.format(ethers.utils.FormatTypes.full);

    var endFile;
    var list;

    if (file.includes("preNftp")) {
      endFile = "./src/abi/nftpAbi.ts";
      list = nftpAbiList;
    } else if (file.includes("prePac")) {
      endFile = "./src/abi/pacAbi.ts";
      list = pacAbiList;
    } else if (file.includes("prePcuy")) {
      endFile = "./src/abi/pcuyAbi.ts";
      list = pachacuyAbiList;
    }

    abi = abi.filter((line) => {
      return list.filter((l) => l == p(line)).length > 0;
    });

    await writeFile(endFile, "export default" + JSON.stringify(abi, null, 2));
  }
}

main();

function p(l) {
  return l.substring(l.indexOf(" ") + 1, l.indexOf("("));
}
