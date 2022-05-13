const path = require("path");
var webpack = require("webpack");

var busdAddress;
var pacAddress;
var nftpAddress;
var pcuyTokenAddress;
var tatacuyAddress;
var chainId;

const isProduction = process.env.NODE_ENV == "production";

if (isProduction) {
  chainId = "56";
} else {
  busdAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
  pacAddress = "0xcC6cFf27ee0BAD7630335652fE345e11A6a5a1fF";
  nftpAddress = "0x68B2630C50535B0c38AdFDf736E1FcDf8190129C";
  pcuyTokenAddress = "0xf75Ee3327CfA5B5223026A08Df8a9D73B3305dFF";
  tatacuyAddress = "0x5571780676d7D3C9498ac5Ae89089e3168923D5D";
  chainId = "97";
  rpcBinance = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  pachacuyInformationAddress = "0x186a2d461FBa223a0E70004c24B8F043bfc74c77";
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
      __pacAddress__: JSON.stringify(pacAddress),
      __nftpAddress__: JSON.stringify(nftpAddress),
      __pcuyTokenAddress__: JSON.stringify(pcuyTokenAddress),
      __tatacuyAddress__: JSON.stringify(tatacuyAddress),
      __chainId__: JSON.stringify(chainId),
      __pachacuyInformationAddress__: JSON.stringify(
        pachacuyInformationAddress
      ),
      __rpcBinance__: JSON.stringify(rpcBinance),
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
