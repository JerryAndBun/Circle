const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  devServer: {
    host: '100.71.27.43',
    port: '8080',
    // proxy: 'http://luoying.free.idcfengye.com',
    // proxy:'http://100.71.26.14:8081',
    // proxy:'http://192.168.0.107:8081',
    // proxy: 'http://49ufux4ghzj6.ngrok2.xiaomiqiu.cn'
  },
})
