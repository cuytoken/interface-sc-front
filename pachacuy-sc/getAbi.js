var fs = require("fs");
var ethers = require("ethers");
var { readdir, readFile, writeFile } = fs.promises;
var path = __dirname + "/src/pre-abi";

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
  "mintTatacuy",
  "mintWiracocha",
  "burnChakra",
  "mintHatunWasi",
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
  "purchaseChakra",
  "purchaseFoodFromChakra",
];

var pachacuyAbiList = ["balanceOf"];

var tatacuyAbiList = [
  "startTatacuyCampaign",
  "finishTatacuyCampaign",
  "getTatacuyInfoForAccount",
  "getListOfTatacuyCampaigns",
  "tryMyLuckTatacuy",
];

var wiracochaAbiList = ["getWiracochaInfoForAccount"];

var chakraAbiList = ["getChakraWithUuid", "getListOfChakrasWithFood"];

var hatunWasiAbiList = ["getListOfHatunWasis", "getAHatunWasi"];

async function main() {
  var files = await readdir(path);
  for (var file of files) {
    if (file.includes("Busd")) continue;
    var content = require(__dirname + "/src/pre-abi/" + file);
    var iface = new ethers.utils.Interface(content);
    var abi = iface.format(ethers.utils.FormatTypes.full);

    var endFile = __dirname + "/src/abi/";
    var list;

    if (file.includes("preNftp")) {
      endFile += "nftpAbi.ts";
      list = nftpAbiList;
    } else if (file.includes("prePac")) {
      endFile += "pacAbi.ts";
      list = pacAbiList;
    } else if (file.includes("prePcuy")) {
      endFile += "pcuyAbi.ts";
      list = pachacuyAbiList;
    } else if (file.includes("preTatacuy")) {
      endFile += "tatacuyAbi.ts";
      list = tatacuyAbiList;
    } else if (file.includes("preWiracocha")) {
      endFile += "wiracochaAbi.ts";
      list = wiracochaAbiList;
    } else if (file.includes("preChakra")) {
      endFile += "chakraAbi.ts";
      list = chakraAbiList;
    } else if (file.includes("preHatunWasi")) {
      endFile += "hatunWasiAbi.ts";
      list = hatunWasiAbiList;
    }

    abi = abi.filter((line) => {
      return list.filter((l) => l == p(line)).length > 0;
    });
    console.log("endFile", endFile);
    await writeFile(endFile, "export default" + JSON.stringify(abi, null, 2));
  }
}

main();

function p(l) {
  return l.substring(l.indexOf(" ") + 1, l.indexOf("("));
}

// get abi of file
// solc --abi --include-path node_modules/ --base-path . contracts/marketplace/PurchaseAssetController.sol
