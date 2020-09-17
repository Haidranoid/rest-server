const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: dev ? 'development' : 'production',
    // define entry file and output
    entry: './react/index.js',
    output: {
        path: path.resolve('public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // define loaders
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './react/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        port: 2210,
        historyApiFallback: true,
    },
};
