const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
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
