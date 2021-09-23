const path = require("path");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env.production"),
    }),
  ],
  // output: {
  //   path: path.resolve(__dirname, '..', './dist'),
  //   filename: 'bundle.js'
  // }
};