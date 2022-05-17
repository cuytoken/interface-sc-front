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
  pachacuyInfoAddress = "0xd1Ab08577E031b5982085438242f2556603553F1";
  pacAddress = "0xD1AAD15F3346D7e8Bc54492863E6bAb15ef83688";
  nftpAddress = "0x293cA76c9BF26d6242114eA1E934bCD04181fea4";
  tatacuyAddress = "0x228655A201Badf04064b7a2C31689800D9Aba23b";
  wiracochaAddress = "0xA77ffB2e5de12B58142793f0e76F101b689fB437";
  pcuyTokenAddress = "0xFf18d02C96794e9BF29a2afa11D74066e835e84D";
  chakraAddress = "0x0B520e8a195557f511978C0A00124071CdE94462";
  hatunWasiAddress = "0x76d71FF97cCE908D3C6f8394151107B27FC1B93E";

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
