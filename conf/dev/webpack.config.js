var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../webpack.conf');
const pkg = require('../../package.json');
var webpack = require('webpack-stream');
const webpackPlugin = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.context = __dirname + '';
config.entry = {
    app: "../../src/app.js",
    vendor: Object.keys(pkg.dependencies)
};
config.output = {
    filename: 'js/[name].js'
};
config.plugins = [
    /*Generate the native css output file */
    new ExtractTextPlugin('css/index.css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: '../../src/index.html'
    }),
    new webpack.webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpackPlugin.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
];

config.module = {
    loaders: [
        { test: /.html$/, loaders: ['html'] },
        { test: /\.less$/, loader: "style!css!less" },
        { test: /\.scss$/, loader: "style!css!sass" },
        // **IMPORTANT** This is needed so that each bootstrap js file required by
        // bootstrap-webpack has access to the jQuery object
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        // loads bootstrap's css.
        { test: /\.css$/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
};

config.debug = true;
config.devtool = 'source-map';

module.exports = config;