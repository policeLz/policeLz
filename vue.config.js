const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
};
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    filenameHashing: true,
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: false,
    css: {
        sourceMap: true,
    },
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', '.css', 'scss'],
            alias: {
                '@': resolve('src'),
                'assets': resolve('src/assets'),
                'components': resolve('src/components'),
                'images': resolve('src/assets/images')
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: true,
    }
}