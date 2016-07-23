'use strict'

var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(process.cwd(), 'dist/'),
        filename: 'chart.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel?presets[]=es2015',
            exclude: /node_modules/
        }, {
            test: /\.png$/,
            loader: 'url'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'eval'
}
