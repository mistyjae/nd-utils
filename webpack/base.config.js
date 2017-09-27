var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

const baseDirName = path.join(__dirname, '../')

module.exports = {
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
        //new ExtractTextPlugin('app.[contenthash].css', {
        //    allChunks: true
        //}),
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    },
        //    output: {
        //        comments: false
        //    }
        //})
    ],
    resolve: {
        alias: {
            styles: path.resolve(baseDirName, 'styles'),
            img: path.resolve(baseDirName, 'img')
        },
        modulesDirectories: [
            'node_modules', 'common', 'img'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel', 'eslint'],
                include: path.join(baseDirName, 'src')
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(baseDirName, 'node_modules')
                ],
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer?{browsers:["> 5%", "ie >= 8"]}'
            },
            {
                test: /\.json$/,
                include: [
                    path.resolve(baseDirName, 'exceptionlist.json'),
                    path.resolve(baseDirName, 'src'),
                    path.resolve(baseDirName, 'res'),
                    path.resolve(baseDirName, 'img/smiley')
                ],
                loaders: ['json']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|cur)$/,
                loaders: ['url-loader?limit=12240']
            },
            { test: /\.svg(\?t=[0-9]+)?$/, loader: 'url?limit=100000&mimetype=image/svg+xml' },
            { test: /\.woff(\?t=[0-9]+)?$/, loader: 'url?limit=100000&mimetype=application/font-woff' },
            { test: /\.woff2(\?t=[0-9]+)?$/, loader: 'url?limit=100000&mimetype=application/font-woff2' },
            { test: /\.[ot]tf(\?t=[0-9]+)?$/, loader: 'url?limit=100000&mimetype=application/octet-stream' },
            { test: /\.eot(\?t=[0-9]+)?$/, loader: 'url?limit=100000&mimetype=application/vnd.ms-fontobject' }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader']
            }
        ]
    },
    externals: {CONFIG: "CONFIG"}
};
