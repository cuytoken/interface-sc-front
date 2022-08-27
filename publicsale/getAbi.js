var fs = require("fs");
var ethers = require("ethers");
var { readdir, readFile, writeFile } = fs.promises;
var path = __dirname + "/src/pre-abi";

var usdcAbiList = [
  "transfer",
  "transferFrom",
  "balanceOf",
  "allowance",
  "approve",
];
var publicSaleAbiList = [
  "purhcasePcuyWithUsdc",
  "exchangeRateUsdcToPcuy",
  "walletForFunds",
  "totalUsdcRaised",
  "totalPcuySold",
  "totalPcuyVesting",
];

async function main() {
  var files = await readdir(path);
  for (var file of files) {
    var content = require(__dirname + "/src/pre-abi/" + file);
    var iface = new ethers.utils.Interface(content);
    var abi = iface.format(ethers.utils.FormatTypes.full);

    var endFile = __dirname + "/src/abi/";
    var list;

    if (file.includes("prePublic")) {
      endFile += "publicAbi.ts";
      list = publicSaleAbiList;
    } else if (file.includes("preUsdc")) {
      endFile += "usdcAbi.ts";
      list = usdcAbiList;
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
