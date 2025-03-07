module.exports = {
    devServer: {
        port: 8000, // B端 端口号
        proxy: {
            '/api': {  // 添加前导斜杠
                target: 'http://127.0.0.1:3001',    //mock
                changeOrigin: true
            }
        }
    }
}