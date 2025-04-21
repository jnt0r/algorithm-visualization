const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/public/index.ts',
    },
    mode: 'production',
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Algorithm Visualization',
            template: 'src/public/index.html',
            minify: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                use: [ 'ts-loader' ],
            },
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js', '.css' ],
        modules: [ path.join(__dirname, 'src'), 'node_modules' ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
