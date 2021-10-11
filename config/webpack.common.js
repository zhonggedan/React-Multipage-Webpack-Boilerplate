const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const getEntry = require("./utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".json", ".jsx", ".ts", ".tsx"],
  },
  
  plugins: [
    new ProvidePlugin({
      React: "react",
    }),
  ],
};

getEntry().forEach((pathname) => {
  let conf = {
    filename: path.join(path.dirname(__dirname), "dist",  pathname, "index") + ".html",
    template: path.join(
      path.dirname(__dirname),
      "src",
      pathname,
      "template",
      "index.html"
    ),
    publicPath: "../",
    chunks: ["manifest", "vendor", pathname],
  };
  commonConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = commonConfig;
