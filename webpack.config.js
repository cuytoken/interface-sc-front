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
  pachacuyInformationAddress = "0xddF6f5Acd45Ae6E117162Fb422630e17864C9871";
  // SC
  pacAddress = "0xEa8cBE023fdF9D1bD54096369e8045A08C31075A";
  nftpAddress = "0x3a45Cbc948F4CC4f5f47338f309C3d8f1B3a3Cb2";
  tatacuyAddress = "0x4D7a80b6072c9F180f1430bc5837fADBf9487333";
  wiracochaAddress = "0x522BFD9D2bE0cdc39BA26a0586e88DE3E986cA37";
  pcuyTokenAddress = "0xe9ADC85e6bBef9B84F8Ff2c1Ac6a58C58BdE2606";

  // Webhooks
  chainId = "97";
  rpcBinance = "https://data-seed-prebsc-1-s1.binance.org:8545/";
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
      __pachacuyInformationAddress__: JSON.stringify(
        pachacuyInformationAddress
      ),

      // SC
      __pacAddress__: JSON.stringify(pacAddress),
      __nftpAddress__: JSON.stringify(nftpAddress),
      __tatacuyAddress__: JSON.stringify(tatacuyAddress),
      __wiracochaAddress__: JSON.stringify(wiracochaAddress),
      __pcuyTokenAddress__: JSON.stringify(pcuyTokenAddress),

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
