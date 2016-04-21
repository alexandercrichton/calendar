var webpack = require("webpack");

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: '../MyCalendar/MyCalendar/Scripts/app/build/bundle.js'
    },
    resolve: {
        extensions: ['', '.Webpack.js', '.web.js', '.js', '.jsx']
    },
    devTools: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015"],
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ]
}