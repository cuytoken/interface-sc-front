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

//
var chainId;
var tatacuyEndPoinValidation;
var version;

const isProduction = process.env.NODE_ENV == "production";

if (isProduction) {
  chainId = "56";
} else {
  tatacuyEndPoinValidation =
    "3.80.7.117:3000/tatacuy/gift-participations/0x718429dde591a305610a664c7046664422095ac3/wallet/1652859269000/timestamp";
  busdAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
  rockPapetScissorsAddress = "0x2F308566ca703d5Edbc2AA602410Aa8a358d4dE8";
  // SC BSC
  // pachacuyInfoAddress = "0x72d620EA947cFE5fceDf0FF94Dc9A0Fa498C7cc7";
  // randomNumber_PLACEHOLDER = "0xf7c52229b2341Bd53881Eb3A5Cc0bFa563292060";
  // pacAddress = "0xe8A25f2A8f992bfe250f43ab29f2EBec6E27C46b";
  // nftpAddress = "0x6eed8097f6EAb67E36F9ff881c26FC6dcb484261";
  // tatacuyAddress = "0xAd44dA390Cd081316a2aB756E6653b2083ac06F4";
  // wiracochaAddress = "0xf08E3E310562a355E264420917dcCD352b9005b9";
  // pcuyTokenAddress = "0x914C617CB3A1C075F9116734A53FfbCF5CeD6CA9";
  // chakraAddress = "0x1BBf94847a403dB5527e10BDDC8b725AAD74eB29";
  // hatunWasiAddress = "0x0697473655bb97F27d5325d76b528155eC9FB9c7";
  // misayWasiAddress = "0x54954bcaC019930689f00c0aa28a65aD15a6d6aD";
  // guineaPigAddress = "0xcc221b16cEC077f33188CDdC336db0eddf403303";
  // binarySearchAddress = "0xd209d5fc0059fE395C9AD29A04779118504DAe3e";
  // pachaAddress = "0xbd4c06387bF3AF07c110A55072Cc6DBC36a39625";
  // qhatuWasiAddress = "0x02004343FfdB944C6a0EEd7246e0015A4A96d050";

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
  // other set up
  // binance
  // chainId = "97";
  // polygon
  chainId = "80001";
  version = "alpha";
  // Binance
  // rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  // Polygon
  rpcUrl = "https://matic-mumbai.chainstacklabs.com";
  // Webhooks
  // Binance
  // webhookTatacuy =
  // "https://api.defender.openzeppelin.com/autotasks/525abdd1-ee48-4a15-96d8-8d63160dd81e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/9vRaF3QV5wkMVWk6XdoWpf";
  // webhookWiracocha =
  // "https://api.defender.openzeppelin.com/autotasks/f1047be3-364f-4b51-91eb-165d216e36fc/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/ESgNxGaerpLGZj48wbX4Mc";
  // Polygon
  webhookTatacuy =
    "https://api.defender.openzeppelin.com/autotasks/068eb09c-6c1e-43b0-8f9b-d2ab5bac527e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/Jhpg3tk3KMqZhQF6zbUgCE";
  webhookWiracocha =
    "https://api.defender.openzeppelin.com/autotasks/ae3ccb21-b444-4802-955c-dcc70ca73a1c/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/FVwq4BNnFFQsBiYx2KKEZ6";
}

const config = {
  entry: `./${process.env.LIBRARY_ENV}/src/index.ts`,
  output: {
    path: path.resolve(__dirname, process.env.LIBRARY_ENV, "dist"),
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

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    // config.devtool = "cheap-module-source-map";
    // config.devtool = "source-map";
    // config.devtool = "inline-cheap-source-map";
    config.devtool = "inline-cheap-module-source-map";
  }
  return config;
};
