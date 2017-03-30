'use strict';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'public/app': './src/ui/js/app'
    },
    output: {
        filename: "./dist/[name].js"
    },
    target: "node",
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/ui/',
            to: 'dist/public/',
            ignore: ['*.js']
        }])
    ]
}
