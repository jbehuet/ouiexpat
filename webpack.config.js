'use strict';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'public/js/app': './src/ui/js/app',
        'public/js/vendor' : ['angular', 'angular-ui-router']
    },
    output: {
        filename: "./dist/[name].min.js"
    },
    target: "node",
    devtool: 'source-map',
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
