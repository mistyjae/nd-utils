var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');
var baseConfig = require('./base.config.js');

var replaceThis = '<div id="root"></div>';
var withThis = '<div id="root"></div>' +
    '<script src="/dist/app.bundle.js" defer></script>';

var cnt = fs.readFileSync(path.join(__dirname, 'index-template.html'));
fs.writeFileSync('index.html', cnt.toString().replace(replaceThis, withThis).replace(/\<title.*title\>/, '<title>social image viewer example</title>'));

var host = 'http://localhost:3030'
var publicPath = '/'

const baseDirName = path.join(__dirname, '../')

module.exports = {
    ...baseConfig,
    devtool: 'inline-source-map',
    debug: true,
    entry: {
        app: [
            './src/index'    // 测试所有
            //'./src/index2' // 测试局部
            ]
    },
    output: {
        path: path.join(baseDirName, 'dist'),
        filename: '[name].bundle.js',
        publicPath: publicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('development')}
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
        //new ExtractTextPlugin('app.[contenthash].css', {
        //    allChunks: true
        //}),
        //new webpack.optimize.DedupePlugin()
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    },
        //    output: {
        //        comments: false
        //    }
        //})
    ]
}

