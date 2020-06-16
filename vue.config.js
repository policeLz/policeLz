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
    // externals:{
    //     BMap:"BMap"
    // },
    css: {
        sourceMap: true,
        // loaderOptions: {
        //     sass: {
        //         prependData: ` @import "@/assets/styles/variable.scss";`
        //     }
        // }
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




}