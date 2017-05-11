const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../webpack.conf');
const webpackPlugin = require('webpack');

config.context = __dirname + '';
config.entry = {
    app: "../../src/app.js"
};
config.output = {
    filename: 'js/app.bundle.js'
};
config.plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '../../src/index.html'
    }),
    new webpackPlugin.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
];

module.exports = config;