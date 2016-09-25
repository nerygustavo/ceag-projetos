const webpack = require('webpack');
const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
module.exports = {
    devtool: 'source-maps',
    entry: {
        react: './client/app/Main.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/js/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules"]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loaders: ['babel']
        }, {
            test: /\.css$/,
            loader: combineLoaders([{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }])
        }]
    }
};
