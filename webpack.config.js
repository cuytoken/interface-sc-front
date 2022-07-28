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
var TARGET_ALPHA_4 = "TARGET_ALPHA_4";

var target = process.argv.filter((el) => el.includes("target"))[0];
target = target.substring(target.indexOf("=") + 1);

function updateSmartContracts(target) {
  if (target == "production") {
    chainId = "56";
  } else if (target == TARGET_ALPHA_4_DEV) {
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // ALPHA 4-dev
    pachacuyInfoAddress = "0xA135a1EdB59E24c28C407f0224e60CbFCB6C629B";
    randomNumber_PLACEHOLDER = "0x436eCdd68773129fb48c6E6ceD8A473042BbFfe3";
    pacAddress = "0x0DEAf18A4c0c5879a00E4E86A010C1DdC632C417";
    nftpAddress = "0x5571780676d7D3C9498ac5Ae89089e3168923D5D";
    tatacuyAddress = "0xE7551689191dDd744296BCb3CA500452f4feF00f";
    wiracochaAddress = "0x8AE6D7BCf46E26b338b2885a11c225d97e34BA2A";
    pcuyTokenAddress = "0x35365656e1B19510e67082fCCB360a8652745935";
    chakraAddress = "0x29584F61d45825BEcB8Bd2dBb9935786d473eEa7";
    hatunWasiAddress = "0x7D0DD9Bd1592C834a61204874eca06c063166538";
    misayWasiAddress = "0x699DC9c85335d58efcAbbB503E88D12C44ec2144";
    guineaPigAddress = "0x98935C0cDD0D08b9836c530E8b9881592785B4F8";
    binarySearchAddress = "0xb79a8b139be07A03e4EFD3E44d14363c7A94476D";
    pachaAddress = "0x454B8fA57949F1b9109e8c212feBCc0db6Ce863F";
    qhatuWasiAddress = "0x55122c9f3e8e530193E016f810dAc00431D57a22";

    // polygon
    chainId = "80001";
    version = "alpha";
    // Polygon
    rpcUrl = "https://matic-mumbai.chainstacklabs.com";
    // Webhooks alpha 4 - new account at leecrosbym@gmail.com
    webhookTatacuy =
      "https://api.defender.openzeppelin.com/autotasks/13d87921-0d7b-4f14-b010-403a3214ecd6/runs/webhook/2de3a3ef-16af-4512-9691-8eb2d20a5510/AZdQDRPBS8N2GubSU63yDp";
    webhookWiracocha =
      "https://api.defender.openzeppelin.com/autotasks/0da33549-014d-485d-8976-c659a3b5d871/runs/webhook/2de3a3ef-16af-4512-9691-8eb2d20a5510/BQPqnajMsCR9j3wBa2BrAa";
  } else if (target == TARGET_ALPHA_4) {
    rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";

    // ALPHA 4-dev
    pachacuyInfoAddress = "0x8D9800bE0f0a467Ab93E22280371bEc2cFdb9069";
    randomNumber_PLACEHOLDER = "0x446A49F1DACbA1Da89011f0e5e4c926E4066e7c8";
    pacAddress = "0x3b7c2b1f86b4861D6D6BeDC27174a7a25c1dCfD6";
    nftpAddress = "0xCae449A6ad50680080FCbbE9101a265AdC1d7Ea7";
    tatacuyAddress = "0xF85901f3dd881A8067BA50d4a89AB44c34B9e0f1";
    wiracochaAddress = "0x9EdA9E8887BF7C22226A228eA88b93ff4cE31B09";
    pcuyTokenAddress = "0xBc6B4140371a7A1328b5cFbAf1830CAd5e82B0D2";
    chakraAddress = "0x5A79bA9aC2cC47FD60fa2Fe34fAa8Fb24C335E68";
    hatunWasiAddress = "0xE31b350A5e2B0F4551912259b85b43Ab7E1B220B";
    misayWasiAddress = "0xdf07dD3C0129DcAeD7Ba7A62e0cce346DfA14E5F";
    guineaPigAddress = "0xDff0Ae6Ac56F72f021C2632aF241315eF22aD9C7";
    binarySearchAddress = "0xA1072b40986E8A7a26aADD71d53fB677Cd55b7D3";
    pachaAddress = "0x46122B7Ff95260268de9F7f377EB83b969ca824A";
    qhatuWasiAddress = "0xd13F8D7Fa433bFfaeed525E6a31D7B5e8AAEe8F3";

    // polygon
    chainId = "80001";
    version = "alpha";
    // Polygon
    rpcUrl = "https://matic-mumbai.chainstacklabs.com";
    // Webhooks
    webhookTatacuy =
      "https://api.defender.openzeppelin.com/autotasks/0fcaca78-3e3a-469d-a5d2-2ab00a10d264/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/EusJT9PkDBAwk4zTiqhGr4";

    webhookWiracocha =
      "https://api.defender.openzeppelin.com/autotasks/be1e1aee-cae2-43c1-8f62-7458f2eedfa9/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/D5YWRAm5sswmgMct66GL6H";
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
