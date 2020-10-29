const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    resolve: {
        extensions: [".ts", ".js"]
    },
    entry: {
        'polyfills': './src/adapters/primaries/angular/config/polyfills.ts',
        'vendor': './src/adapters/primaries/angular/config/vendor.ts',
        'app': path.resolve('./src/adapters/primaries/angular/index.ts')
    },
    mode: 'development',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    optimization: { minimize: false },
    module: {
        rules: [
            { test: /\.ts?$/, exclude: /node_modules/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/, use: ['file-loader'] }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: `./src/adapters/primaries/angular/index.html`,
        filename: 'index.html',
    }),
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        './app', {}
    ),
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        API: 'rest'
      })],
    devServer: {
        contentBase: path.resolve('./dist'),
        clientLogLevel: 'warning',
        publicPath: '/',
        compress: true,
        historyApiFallback: true,
        hot: true,
        overlay: {
            warnings: false,
            errors: true
        },
        port: 3007,
        quiet: true
    }
};

module.exports = config;