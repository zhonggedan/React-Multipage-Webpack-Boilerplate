const path = require("path");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const getEntry = require("./utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const addEntry = () => {
  let entryObj = {};
  getEntry().forEach((item) => {
    entryObj[item] = {
      import: path.join(path.dirname(__dirname), "src", item, "index.jsx"),
      filename: path.join(item, item) + ".js",
    };
  });
  return entryObj;
};

const pageExtractCssArray = [];
getEntry().forEach((item) => {
  pageExtractCssArray.push(
    new MiniCssExtractPlugin({ filename: item + "/[name].[contenthash].css" })
  );
});
module.exports = {
  mode: "production",
  devtool: "source-map",
  mode: "production",
  entry: addEntry(),
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [
      path.resolve(__dirname, 'dist'),
    ]}),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env.production"),
    }),
    new MiniCssExtractPlugin({
      filename: (item) => {
        return path.join(item.chunk.name, item.chunk.name) + ".css";
      },
    }),
  ],
  // output: {
  //   path: path.resolve(__dirname, '..', './dist'),
  //   filename: 'bundle.js'
  // },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "common",
          filename: (e) => {
            return path.join("vendors", "common") + ".js";
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
