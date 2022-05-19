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
  pachacuyInfoAddress = "0xC980069bEAe792be83906DC7996dDdb5aCC04938";
  randomNumber_PLACEHOLDER = "0xc1A3C119955896DF5eE0327b50529A66aEe08052";
  pacAddress = "0x04DA3bCB953Dd65eA5E4CEB6586d0ae4C002a467";
  nftpAddress = "0x5B42d7906AE52DdEf9751a347f303789753cACD1";
  tatacuyAddress = "0xd09Eb12047905B6C4Ec9f445D6871346645c1e8c";
  wiracochaAddress = "0xd5906d1A3596749652A428eC908F2fF8Db915b4C";
  pcuyTokenAddress = "0xD594033986130a2D4F8c15f3Bf8B5b10B66a9bb4";
  chakraAddress = "0x3a0a404d9123deADd0A41bc4dAEBbA417C800389";
  hatunWasiAddress = "0x23fc03e634a686d74d96641F40251D9855A544F0";

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
