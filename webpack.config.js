const path = require("path");
var webpack = require("webpack");

var busdAddress;
var pacAddress;
var nftpAddress;
var pcuyTokenAddress;
var tatacuyAddress;
var wiracochaAddress;
var chakraAddress;
var hatunWasiAddress;
var pachacuyInfoAddress;
var chainId;

const isProduction = process.env.NODE_ENV == "production";

if (isProduction) {
  chainId = "56";
} else {
  busdAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
  // SC
  pachacuyInfoAddress = "0x9eadf5161b66046386e24a6c13179b134d0b7af5";
  randomNumber_PLACEHOLDER = "0xdfc303e10a29ba6970da02540413d469ebe9eaf3";
  pacAddress = "0x85747e1602965e0085fd5eb6718fbc4455134318";
  nftpAddress = "0xd991d1c6e5c669b8aec320816726a32e69b3db42";
  tatacuyAddress = "0xe949b78721d9d7e7a2bd18860fbcbe0e9e8794bf";
  wiracochaAddress = "0x77dd16139d3fc8a007a69addb66e14cfbf9b2905";
  pcuyTokenAddress = "0x8cd05abeac7cd0b36a00f4e43bffbbf42c0741f5";
  chakraAddress = "0xded7db3093c9a416e768dbf830a3f65227e68480";
  hatunWasiAddress = "0xdf237f13d8f6d20607cc895c393e0b41d19a913b";

  chainId = "97";
  rpcBinance = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  // Webhooks
  webhookTatacuy =
    "https://api.defender.openzeppelin.com/autotasks/3da214c4-a2e1-407b-8f83-7227ff917f0e/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/8oR97h8mCyzteR52LJqcNm";
  webhookWiracocha =
    "https://api.defender.openzeppelin.com/autotasks/a6363d6c-5cba-4534-9f6d-e1f49616f6a8/runs/webhook/76c42997-e9b0-4d14-ad84-d3386204500c/4Zhkyhgr1izyxVMMtxu95k";
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
      __pacAddress__: JSON.stringify(pacAddress),
      __nftpAddress__: JSON.stringify(nftpAddress),
      __tatacuyAddress__: JSON.stringify(tatacuyAddress),
      __wiracochaAddress__: JSON.stringify(wiracochaAddress),
      __pcuyTokenAddress__: JSON.stringify(pcuyTokenAddress),
      __chakraAddress__: JSON.stringify(chakraAddress),
      __hatunWasiAddress__: JSON.stringify(hatunWasiAddress),

      // Webhooks
      __chainId__: JSON.stringify(chainId),
      __rpcBinance__: JSON.stringify(rpcBinance),
      __webhookTatacuy__: JSON.stringify(webhookTatacuy),
      __webhookWiracocha__: JSON.stringify(webhookWiracocha),
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
