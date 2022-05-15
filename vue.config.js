const {
  defineConfig,
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: 'http://luoying.free.idcfengye.com',
    // proxy:'http://localhost:3000',
    proxy:'http://192.168.0.107:8080',

  }
})
