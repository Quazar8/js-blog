const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
    entry: ["react-hot-loader/patch", "./client/client.js"],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../static")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: "./client/index.html",
            favicon: "./client/favicon.png"
        })
    ],
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}