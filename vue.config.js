const path = require('path')

module.exports = {
    outputDir: path.join(__dirname, 'dist', 'lib'),
    publicPath: path.join(__dirname, 'dist', 'lib'),
    configureWebpack: {
        output: {
            library: 'WeJS',
            libraryExport: 'default',
            libraryTarget: 'umd',
            filename: 'WeJS.js',
        }
    }
}