'use strict'
require('babel-register')

let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let config = require('./webpack/dev.config')

let server = new WebpackDevServer(webpack(config), {
    //contentBase: config.output.path, // 代码目录
    debug: true,
    publicPath: config.output.publicPath,  // access url
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
})

server.listen(8000, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err)
    }

    console.log('==> Listening at localhost:8000')
})

