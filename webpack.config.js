const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.ts',
    },
    mode: 'development',
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Algorithm Visualization',
            template: 'src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                use: ["awesome-typescript-loader"],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
};
