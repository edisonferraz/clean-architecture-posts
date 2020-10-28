const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPageNames = ['post'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/adapters/primaries/vanilla/html/${name}.html`,
    filename: `${name}.html`
  })
});

const config = {
    resolve: {
        extensions: [".ts", ".js", "json"]
    },
    entry: [ 'webpack/hot/dev-server', path.resolve('./src/adapters/primaries/vanilla/js/app.js') ],
    mode: 'development',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    optimization: { minimize: false },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.ts?$/, exclude: /node_modules/, use: ['awesome-typescript-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/, use: ['file-loader'] }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: `./src/adapters/primaries/vanilla/html/index.html`,
        filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        API: 'rest'
      })].concat(multipleHtmlPlugins),
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
        port: 3004,
        quiet: true
    }
};

module.exports = config;