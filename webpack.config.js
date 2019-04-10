const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader',
                'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                  ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};
