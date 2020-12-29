const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")

const config = {
    entry: ["react-hot-loader/patch", "./client/client.js"],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../static"),
        publicPath: "/"
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
                test: /\.(jpg|png|svg|jpeg|gif|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
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
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.mode = 'production'
    } else {
        config.devtool = 'source-map'
        config.mode = 'development'
    }

    return config
}