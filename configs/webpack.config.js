const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["react-hot-loader/patch","./client/client.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../static")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: "./client/index.html"
        })
    ],
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    devtool: "source-map"
}