module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        proxy: {
            '/ihrm': {
                target: 'http://localhost:9090',
            }
        }
    }
}