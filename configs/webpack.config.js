const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./client/client.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../static")
    },
    plugins: [
        new HtmlPlugin({
            template: "./client/index.html"
        })
    ]
}