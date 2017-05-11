var config = {
    context: __dirname + '/..',

    entry: ['./src/app.js'],

    module: {
        preLoaders: [],
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
    }
};

module.exports = config;