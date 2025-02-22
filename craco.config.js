module.exports = {
    devServer: {
        proxy: {
            '/api': {  // 添加前导斜杠
                target: 'http://127.0.0.1:3001',
                changeOrigin: true
            }
        }
    }
}