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
var tatacuyEndPoinValidation;

const isProduction = process.env.NODE_ENV == "production";

if (isProduction) {
  chainId = "56";
} else {
  tatacuyEndPoinValidation =
    "3.80.7.117:3000/tatacuy/gift-participations/0x718429dde591a305610a664c7046664422095ac3/wallet/1652859269000/timestamp";
  busdAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
  // SC
  pachacuyInfoAddress = "0xcF2dbF4C6C3574c5Aa189dd1630cfBcCfCbd3821";
  randomNumber_PLACEHOLDER = "0xE10Dd96e835bB644ED5ee56F8aeC22fa919001bc";
  pacAddress = "0xaAD60f7776a309096B412544EfB2A0340CC7D25A";
  nftpAddress = "0xae4c9B5aFCa4ce804cD9c6f39D8B6ed761fa6b1d";
  tatacuyAddress = "0x7dc7ea4A35879D6cb3A0f40076671e8c768952cA";
  wiracochaAddress = "0xA5100bE10f9e9da4cD1bA33553Fe119861E11a27";
  pcuyTokenAddress = "0x88114135e76b555490d9040c1d01A548B0570e99";
  chakraAddress = "0xab87082eCac2A7D4fcAB8Fa8f097C9C4F75E05D1";
  hatunWasiAddress = "0xE6E11D8825420cDe677a78057053BEEf5490664B";

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
