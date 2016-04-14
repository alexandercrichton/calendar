module.exports = {
    entry: './Scripts/app/src/index.jsx',
    output: {
        filename: 'Scripts/app/build/bundle.js'
    },
    resolve: {
        extensions: ['', '.Webpack.js', '.web.js', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                //exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    }
}