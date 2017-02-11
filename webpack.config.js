const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: [
        'babel-polyfill',
        './src/root'
    ],
    output: {
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"],
                }
            }
        ]
    },
    debug: true
}