var path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

console.log("console:" + path.resolve(__dirname, "./dist"));

module.exports = {
  entry: {
    app: "./src/my-app-elements/my-app/my-app.js",
    sw: "./src/service-worker.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "My App",
      template: path.resolve(__dirname, "src/index.html"),
      filename: path.resolve(__dirname, "dist/index.html"),
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          "node_modules/@webcomponents/webcomponentsjs/*.js"
        ),
        to: "node_modules/@webcomponents/webcomponentsjs/[name].[ext]"
      }
    ])
  ]
};
