module.exports = {
  lintOnSave: false, //关闭语法检查

  /* 开启代理服务器 */
  devServer: {
    proxy: {
      '/socket': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/socket': ''
        },
        ws: true,
        changeOrigin: true
      },
    }
  },
}