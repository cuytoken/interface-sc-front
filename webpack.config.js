const path = require("path");
var webpack = require("webpack");

var busdAddress;
// Addresses
var pachacuyInfoAddress;
var randomNumber_PLACEHOLDER;
var pacAddress;
var nftpAddress;
var tatacuyAddress;
var wiracochaAddress;
var pcuyTokenAddress;
var chakraAddress;
var hatunWasiAddress;
var misayWasiAddress;
var guineaPigAddress;
var binarySearchAddress;
var pachaAddress;
var qhatuWasiAddress;

// Set up
var chainId;
var version;
var rpcUrl;
var webhookTatacuy;
var webhookWiracocha;
var rockPapetScissorsAddress;

var TARGET_ALPHA_2 = "TARGET_ALPHA_2";
var TARGET_ALPHA_3_DEV = "TARGET_ALPHA_3_DEV";

var target = process.argv.filter((el) => el.includes("target"))[0];
target = target.substring(target.indexOf("=") + 1);

function updateSmartContracts(target) {
  if (target == "production") {
    chainId = "56";
  } else if (target == TARGET_ALPHA_3_DEV) {
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // ALPHA 3-dev

    pachacuyInfoAddress = "0x685B40098986b979e93d8dFf4DAA44D318b044C7";
    randomNumber_PLACEHOLDER = "0x3a07DBEa9c988d7C36b03ed1B04b7BDb29d92D19";
    pacAddress = "0x0521Ed1dB5C2EdA27E1923EbA54b3a60366cBB57";
    nftpAddress = "0xBe2C7327CE0a6117B0343FFf898163E89fA10cAf";
    tatacuyAddress = "0x11F679d52B353a3ac68013a75F12eD1b0E39a8A2";
    wiracochaAddress = "0xd8BC45aD0D8f96CA7B02Edd103112aE26ad9901e";
    pcuyTokenAddress = "0x1FB066541aa8E779DFD6435c7Fc601cB4a8ad522";
    chakraAddress = "0x6Fe43f137E25F3aF1Dd6C2614069639fe1Db8dbe";
    hatunWasiAddress = "0x0047dd79ED3430a9f88d5434Db7066eF0c8d58Dd";
    misayWasiAddress = "0xf21ef780403B5b31f8bf88db006dfC8cFD076bB6";
    guineaPigAddress = "0xBD45B79bE5431dd4d3F549Ef5c7a1fb305C4C48a";
    binarySearchAddress = "0x133739b8C6c56f526cBaf9198850Dc6c42f6C00D";
    pachaAddress = "0x17AfAde6cb74c02cc068AB53e37Cb153220A7922";
    qhatuWasiAddress = "0x40f72b80102db38e0AA71906068c5D0792F9ac60";

    // polygon
    chainId = "80001";
    version = "alpha";
    // Polygon
    rpcUrl = "https://matic-mumbai.chainstacklabs.com";
    // Webhooks
    webhookTatacuy =
      "https://api.defender.openzeppelin.com/autotasks/8aca10b4-337a-4472-906f-bd144cee835f/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/236EgZu2JTTosKsKSCL43p";

    webhookWiracocha =
      "https://api.defender.openzeppelin.com/autotasks/0fcf8849-42e5-4ef1-a135-85644b5c2abd/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/A7JQVwR5i76wfVZrVqJwy2";
  } else if (target == TARGET_ALPHA_2) {
    // ALPHA 2
    busdAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // POLYGON
    pachacuyInfoAddress = "0xd895aDE1CC01A273aCD5A0fDD9223Fe694b0339E";
    randomNumber_PLACEHOLDER = "0x14B0524D9CdBd2098198A6a9e094bbd68974a50B";
    pacAddress = "0xD07374655eC9BCD08229D6Ef4Cb1b815fBD25291";
    nftpAddress = "0x82c85600181f5a89C7F28633083E0385E8F7CBCa";
    tatacuyAddress = "0xA6B3b26fcE99a5Dd8e180c43B8EB98eF6DA493f6";
    wiracochaAddress = "0xA645bFdb41c151d3137b825baA31579240F5Bd08";
    pcuyTokenAddress = "0x26813E464DA80707B7F24bf19e08Bf876F0f3388";
    chakraAddress = "0x6C5Bde05B62CbF11ffD4Dc16B00e3d92907794E9";
    hatunWasiAddress = "0x102913ADb2cDe8333410Cc56cAb15A2543109ec8";
    misayWasiAddress = "0x4f1e1E9753b6bdE59E4863417c392838fdB3FC43";
    guineaPigAddress = "0xB73b9b15740c8951F8b09f6658D971bD40A43188";
    binarySearchAddress = "0x76D298c92eBc45a100f43C9552ebbC4AD10f9859";
    pachaAddress = "0x8137Fbd6E2d73425Cc0a4C31442884580CDB7bD2";
    qhatuWasiAddress = "0xE00aFEf6c4f7a42607d1526f1F43eEdb67EF7aa0";

    // polygon
    chainId = "80001";
    version = "alpha";
    // Polygon
    rpcUrl = "https://matic-mumbai.chainstacklabs.com";
    // Webhooks
    webhookTatacuy =
      "https://api.defender.openzeppelin.com/autotasks/068eb09c-6c1e-43b0-8f9b-d2ab5bac527e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/Jhpg3tk3KMqZhQF6zbUgCE";
    webhookWiracocha =
      "https://api.defender.openzeppelin.com/autotasks/ae3ccb21-b444-4802-955c-dcc70ca73a1c/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/FVwq4BNnFFQsBiYx2KKEZ6";
  }
}
updateSmartContracts(target);

const config = {
  output: {
    filename: "index.js",
    library: {
      type: "umd",
    },
    clean: true,
    globalObject: "this",
  },
  externals: {
    ethers: {
      commonjs: "ethers",
      commonjs2: "ethers",
      amd: "ethers",
      root: "ethers",
    },
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new webpack.DefinePlugin({
      __busdAddress__: JSON.stringify(busdAddress),

      // SC
      __pachacuyInfoAddress__: JSON.stringify(pachacuyInfoAddress),
      __randomNumber_PLACEHOLDER__: JSON.stringify(randomNumber_PLACEHOLDER),
      __pacAddress__: JSON.stringify(pacAddress),
      __nftpAddress__: JSON.stringify(nftpAddress),
      __tatacuyAddress__: JSON.stringify(tatacuyAddress),
      __wiracochaAddress__: JSON.stringify(wiracochaAddress),
      __pcuyTokenAddress__: JSON.stringify(pcuyTokenAddress),
      __chakraAddress__: JSON.stringify(chakraAddress),
      __hatunWasiAddress__: JSON.stringify(hatunWasiAddress),
      __misayWasiAddress__: JSON.stringify(misayWasiAddress),
      __guineaPigAddress__: JSON.stringify(guineaPigAddress),
      __binarySearchAddress__: JSON.stringify(binarySearchAddress),
      __pachaAddress__: JSON.stringify(pachaAddress),
      __qhatuWasiAddress__: JSON.stringify(qhatuWasiAddress),

      // Webhooks
      __chainId__: JSON.stringify(chainId),
      __version__: JSON.stringify(version),
      __rpcUrl__: JSON.stringify(rpcUrl),
      __webhookTatacuy__: JSON.stringify(webhookTatacuy),
      __webhookWiracocha__: JSON.stringify(webhookWiracocha),
      __rockPapetScissorsAddress__: JSON.stringify(rockPapetScissorsAddress),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = (env) => {
  var isProduction = process.env.NODE_ENV == "production";

  config.entry = `./${env.library}/src/index.ts`;
  config.output.path = path.resolve(__dirname, env.library, "dist");

  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    // config.devtool = "cheap-module-source-map";
    config.devtool = "source-map";
    // config.devtool = "inline-cheap-source-map";
    // config.devtool = "inline-cheap-module-source-map";
  }
  return config;
};

/**
 * Commands
 * npm run build-dev:pachacuyinfo --env target=TARGET_ALPHA_3_DEV
 */
