const path = require("path");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");
const getEntry = require("./utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
  mode: "development",
  entry: addEntry(),
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: {
      rewrites: rewritesRules(),
    },
    client: {
      progress: true,
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
    new MiniCssExtractPlugin({
      filename: (item) => {
        return path.join(item.chunk.name, item.chunk.name) + ".css";
      },
    }),
  ],
  devtool: "eval-source-map",
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
