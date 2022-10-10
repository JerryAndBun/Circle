const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: 'http://luoying.free.idcfengye.com',
    // proxy:'http://100.71.26.14:8081',
    // proxy:'http://192.168.0.107:8081',
    // proxy: 'http://49ufux4ghzj6.ngrok2.xiaomiqiu.cn'
  },
})
