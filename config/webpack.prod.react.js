const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    resolve: {
        extensions: [".ts", ".js", "json"]
    },
    entry: ['@babel/polyfill', path.resolve('./src/adapters/primaries/react/index.js') ],
    mode: 'development',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    optimization: { minimize: true },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env","@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    }
                }],
                exclude: /node_modules/
            },
            { test: /\.ts?$/, exclude: /node_modules/, use: ['awesome-typescript-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/, use: ['file-loader'] }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: `./src/adapters/primaries/react/index.html`,
        filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        API: 'graphql'
      })]
};

module.exports = config;