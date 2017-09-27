'use strict'

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseConfig = require('./base.config.js');

const baseDirName = path.join(__dirname, '../')

module.exports = {
    ...baseConfig,
    devtool: false,
    entry: {
        lib: [
            './src/index'
        ]
    },
    output: {
        path: path.join(baseDirName, 'lib'),
        filename: 'index.js',
        library: 'shared-components',
        libraryTarget: 'umd'
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ],
    // https://www.reddit.com/r/reactjs/comments/43odoi/why_does_my_react_library_break_when_loaded/
    externals: {
        'react': {
            'commonjs': 'react',
            'commonjs2': 'react',
            'amd': 'react',
            // React dep should be available as window.React, not window.react
            'root': 'React'
        },
        'react-dom': {
            'commonjs': 'react-dom',
            'commonjs2': 'react-dom',
            'amd': 'react-dom',
            'root': 'ReactDOM'
        },
        'immutable': {
            'commonjs': 'immutable',
            'commonjs2': 'immutable',
            'amd': 'immutable'
        },
        'react-addons-update': {
            'commonjs': 'react-addons-update',
            'commonjs2': 'react-addons-update',
            'amd': 'react-addons-update'
        }
    }
}

