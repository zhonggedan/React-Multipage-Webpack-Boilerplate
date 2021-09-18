const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getEntry = require("./utils");

const addEntry = () => {
  let entryObj = {};
  getEntry().forEach((item) => {
    entryObj[item] = {
      import: path.join(path.dirname(__dirname), "src", item, "index.js"),
      filename: path.join("../dist", item, item) + ".js",
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

const recursiveIssuer = (m) => {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
};

const commonConfig = {
  context: path.resolve(path.dirname(__dirname), "src"),
  entry: addEntry(),
  output: {
    path: path.resolve(__dirname, "..", "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     cacheGroups: addCssSplitChunk()
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: (item) => {
        return path.join("../dist", item.chunk.name, item.chunk.name) + ".css";
      },
    }),
  ],
};

getEntry().forEach((pathname) => {
  let conf = {
    filename:
      path.join(path.dirname(__dirname), "dist", pathname, "index") + ".html",
    template: path.join(
      path.dirname(__dirname),
      "src",
      pathname,
      "template",
      "index.html"
    ),
    chunks: ["manifest", "vendor", pathname],
  };
  commonConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = commonConfig;
