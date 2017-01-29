var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        extractCSS,
        new HtmlWebpackPlugin({
            title: 'GoEuro | GitHub app',
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.(scss|sass)$/,
                loader: extractCSS.extract(['raw-loader', 'sass-loader'])
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    }
};