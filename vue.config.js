const { defineConfig } = require('@vue/cli-service')
const env = process.env.NODE_ENV
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    host: '100.71.23.30',
    port: '8080',
    // proxy: 'http://luoying.free.idcfengye.com',
    // proxy:'http://100.71.26.14:8081',
    // proxy:'http://192.168.0.107:8081',
    // proxy: 'http://49ufux4ghzj6.ngrok2.xiaomiqiu.cn'
  },
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
})
