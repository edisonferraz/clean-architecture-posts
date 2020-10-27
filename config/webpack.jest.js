const Dotenv = require('dotenv-webpack')

module.exports = {
    devtool: 'eval-cheap-module-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            { test: /\.ts$/, use: ['ts-loader'] },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, use: 'file-loader?name=fonts/[name].[ext]' },
            { test: /\.(jpe?g|png|gif)$/i, use: "file-loader?name=images/[name].[ext]" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },

    plugins: [
    ]
}
