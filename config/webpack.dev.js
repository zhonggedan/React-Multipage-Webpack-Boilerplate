const path = require("path");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");
const getEntry = require("./utils");

const rewritesRules = () => {
  let rewrites = [];
  getEntry().forEach((pathname) => {
    rewrites.push({ from: `^\/${pathname}`, to: `/${pathname}/index.html` });
  });
  return [
    { from: /^\/$/, to: "/IndexPage/index.html" },
    ...rewrites,
    { from: /./, to: "/NotFound/index.html" },
  ];
};
module.exports = {
  mode: "development",
  devServer: {
    open: true,
    historyApiFallback: {
      rewrites: rewritesRules(),
    },
    port: 9000,
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env.development"),
    }),
  ],
  devtool: "eval-source-map",
};
