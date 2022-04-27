var fs = require("fs");
var ethers = require("ethers");
var { readdir, readFile, writeFile } = fs.promises;
var path = __dirname + "/src/pre-abi";

var mkplcAbiList = [
  "isMarketPlaceAllowed",
  "getListOfNftsForSale",
  "changePriceOfNft",
  "setPriceAndListAsset",
  "purchaseNftWithPcuy",
  "purchaseNftWithBusd",
];

async function main() {
  var files = await readdir(path);
  for (var file of files) {
    var content = require(path + "/" + file);
    var iface = new ethers.utils.Interface(content);
    var abi = iface.format(ethers.utils.FormatTypes.full);

    var endFile;
    var list;

    if (file.includes("preMktplcAbi")) {
      endFile = __dirname + "/src/abi/mktplcAbi.js";
      list = mkplcAbiList;
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
