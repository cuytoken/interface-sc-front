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
  "getListOfUuidsPerAccount",
  "UuidAndAmount",
  "isGuineaPigAllowedInPacha",
  "mintPachaPassAsOwner",
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
  "purchaseTicketFromMisayWasi",
  "purchaseMisayWasi",
  "purchaseQhatuWasi",
  "purchasePachaPass",
];

var pachacuyAbiList = ["balanceOf"];

var tatacuyAbiList = [
  "startTatacuyCampaign",
  "finishTatacuyCampaign",
  "getTatacuyWithUuid",
  "getListOfTatacuyCampaigns",
  "tryMyLuckTatacuy",
  "FinishTatacuyCampaign",
  "TatacuyTryMyLuckResult",
];

var wiracochaAbiList = [
  "getWiracochaWithUuid",
  "exchangeSamiToPcuy",
  "WiracochaExchange",
  "getListOfWiracochas",
];

var chakraAbiList = [
  "getChakraWithUuid",
  "getListOfChakrasWithFood",
  "updateFoodPriceAtChakra",
];

var hatunWasiAbiList = ["getListOfHatunWasis", "getHatunWasiWithUuid"];

var rpsAbiList = ["playRockPaperScissors"];

var guineaPigAbiList = [
  "getGuineaPigWithUuid",
  "getListOfGuineaPigs",
  "getGuineaPigData",
];

var pachaAbiList = [
  "isPachaAlreadyTaken",
  "getListOfPachas",
  "getPachaWithUuid",
  "getListOfPachaPasses",
  "setPachaToPublic",
  "setPachaPrivacyAndDistribution",
  "getListOfPachaPasses",
  "getPachaPassWithUuid",
];

var misayWasiAbiList = [
  "startMisayWasiRaffle",
  "startRaffleContest",
  "getListOfMisayWasisReadyToRaffle",
  "getListOfActiveMWRaffles",
  "getMisayWasiWithUuid",
  "getMiswayWasiWithTicketUuid",
  "RaffleContestFinished",
];
var qhatuWasiAbiList = [
  "startQhatuWasiCampaign",
  "getListOfQhatuWasi",
  "getQhatuWasiWithUuid",
  "QhatuWasiCampaignStarted",
];

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
    } else if (file.includes("prePacAbi")) {
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
    } else if (file.includes("preRPS")) {
      endFile += "rpsiAbi.ts";
      list = rpsAbiList;
    } else if (file.includes("preGuineaPig")) {
      endFile += "guineaPigAbi.ts";
      list = guineaPigAbiList;
    } else if (file.includes("prePachaAbi")) {
      endFile += "pachaAbi.ts";
      list = pachaAbiList;
    } else if (file.includes("preMisayWasi")) {
      endFile += "misayWasiAbi.ts";
      list = misayWasiAbiList;
    } else if (file.includes("preQhatuWasi")) {
      endFile += "qhatuWasiAbi.ts";
      list = qhatuWasiAbiList;
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
