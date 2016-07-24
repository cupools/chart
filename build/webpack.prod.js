'use strict'

var webpack = require('webpack')
var path = require('path')
var banner = require('./banner')

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(process.cwd(), 'dist/'),
        filename: 'chart.js',
        library: 'chart',
        libraryTarget: 'umd',
        umdNamedDefine: true
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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(banner, {
            entryOnly: true
        })
    ]
}
