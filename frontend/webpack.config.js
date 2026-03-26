// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./js/index.js", // Your main JavaScript file
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "js/dist"),
    filename: "bundle.js", // The output file for bundled code
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Optional: For using modern JS features
          options: {
            presets: ["@babel/preset-env"], // Use the preset for modern JS
          },
        },
      },
    ],
  },
  mode: "development", // Use 'production' for production builds
  devServer: {
    static: path.join(__dirname, "js/dist"),
    compress: true,
    port: 9000,
  },
};
