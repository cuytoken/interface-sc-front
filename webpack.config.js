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
var TARGET_ALPHA_4_DEV = "TARGET_ALPHA_4_DEV";

var target = process.argv.filter((el) => el.includes("target"))[0];
target = target.substring(target.indexOf("=") + 1);

function updateSmartContracts(target) {
  if (target == "production") {
    chainId = "56";
  } else if (target == TARGET_ALPHA_4_DEV) {
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // ALPHA 4-dev
    pachacuyInfoAddress = "0x6400fe050FEBebc026178717e654aaab2e97E87F";
    randomNumber_PLACEHOLDER = "0x37432Bc06196105f2D6657e9361FC90837f41B0a";
    pacAddress = "0x12ad5406567B3326b6014e4037026963511e763D";
    nftpAddress = "0xC16Ef040Da5182ffEE8A1fbdd17895f946B0186e";
    tatacuyAddress = "0x7F4795F3FE40BB4FF9875B2522A48Cd01D25001e";
    wiracochaAddress = "0x6E310780F639215ba1E1Ef169b42A898168c91d0";
    pcuyTokenAddress = "0x7fD2691565A82334840b0D1f5520137B94F733Ea";
    chakraAddress = "0xed37D39d0f6Dc165895e812CDAB94dacfbb1f3D7";
    hatunWasiAddress = "0x184cCb1460E1018032cB1f664BAC5bc9139bD78E";
    misayWasiAddress = "0xE24935E73d1920609a8b5e16Dd3cE24f301598ac";
    guineaPigAddress = "0xE86f77fA5C78a3731c35325335FAD56Fc254b4f8";
    binarySearchAddress = "0x20D4Eb517F02d942C59a61Da0e84000Ff9bb4F5D";
    pachaAddress = "0x3a54A4680c3d81854C329F1dd33F153428E89dbD";
    qhatuWasiAddress = "0x4eC9af683c90A53fE306d3e5c00421f501deD4A7";

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
  } else if (target == TARGET_ALPHA_3_DEV) {
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // ALPHA 3-dev
    pachacuyInfoAddress = "0x1655b030Bad6AB10D44e57bcb3E7e48e29633317";
    randomNumber_PLACEHOLDER = "0x584349e1862DD8aB7A95924F428870ef1D03a774";
    pacAddress = "0x0ACD7cd9eb35507b5354223571963d15d28Afa86";
    nftpAddress = "0xD1349732f128e21e9a8bD974a0fF1fA9b7d62a11";
    tatacuyAddress = "0x114bA5B4f6Cc1661628A7c7784f406a2DCBC6f82";
    wiracochaAddress = "0x95F99e19f620b9597AeA5C0D461D4e905fC67b72";
    pcuyTokenAddress = "0x829776b2eb5D6588971cabf6186bA39243b83fc0";
    chakraAddress = "0xc0CF45633fb9Ec2f4b072c82139075c742D3B487";
    hatunWasiAddress = "0xDdb1E26f2fFaa644E1E3043e77924C317994a535";
    misayWasiAddress = "0x3724172Cdb9E3C5D721Ba2ca12EAf43F4e47323C";
    guineaPigAddress = "0x8C22443f080c423E0E638cc2FA22c2b438904291";
    binarySearchAddress = "0x2c8d6dd81200a3D09D0BBBAA14c38a7495716FA3";
    pachaAddress = "0xb6ab2849ACF54Eeec1112d3EE72168EAb56585E6";
    qhatuWasiAddress = "0xFb40402d38324be195ABe44C64C30727000DdD0A";

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
 * npm run build-dev:pachacuy --env target=TARGET_ALPHA_4_DEV
 */
