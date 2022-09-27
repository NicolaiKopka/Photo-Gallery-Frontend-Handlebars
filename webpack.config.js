const { resolve } = require('path');
const path = require('path');

module.exports = {
    entry: {
        app: "./scripts/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.bundle.js"

    },
    mode: "development",
    devServer: {
        historyApiFallback: true,
      },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
}