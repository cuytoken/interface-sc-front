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
  // SC
  pachacuyInfoAddress = "0x7630E4d45b5cD3193995Ee424019804c5C055C6b";
  randomNumber_PLACEHOLDER = "0x8ba7AEa861e465999a175310f29d381114D3Ce29";
  pacAddress = "0xA50d8de192abd34c11c18652E6a570b966022071";
  nftpAddress = "0x27B5733C942B20457371c1B6bbcaD2F8B5d07576";
  tatacuyAddress = "0xD6cDFb590364E478AB3151Edc0180ebf82Bb456F";
  wiracochaAddress = "0x8049f248b7645CAbe552aED85fD897E79aAF7080";
  pcuyTokenAddress = "0x455B99b20701d2e3495F5dfcc2D27010B7d48D1F";
  chakraAddress = "0x129EE46cC9f11e728AFFDb8c0012D76Cb0B9739b";
  hatunWasiAddress = "0xFa37aD7ec65ae1be8f021D6A72872dC1ac22790c";
  misayWasiAddress = "0x05ad225CF9Fc4C7A13416194bCa2260580A55193";
  guineaPigAddress = "0xbB528C3ba24647D710b667B439d5e84D7e35B7bc";
  binarySearchAddress = "0xF4932B823c7444c2684857f8b307AC8A8B90C089";
  pachaAddress = "0x34Df8bA6C7cE58708aDfd2e9137b573FD4Cd7d76";
  qhatuWasiAddress = "0x6680ceEa5F2717e5280B055313035c76166fF3B8";

  // other set up
  chainId = "97";
  version = "alpha";
  rpcBinance = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  // Webhooks
  webhookTatacuy =
    "https://api.defender.openzeppelin.com/autotasks/525abdd1-ee48-4a15-96d8-8d63160dd81e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/9vRaF3QV5wkMVWk6XdoWpf";
  webhookWiracocha =
    "https://api.defender.openzeppelin.com/autotasks/f1047be3-364f-4b51-91eb-165d216e36fc/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/ESgNxGaerpLGZj48wbX4Mc";
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
      __rpcBinance__: JSON.stringify(rpcBinance),
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
    config.devtool = "source-map";
  }
  return config;
};
