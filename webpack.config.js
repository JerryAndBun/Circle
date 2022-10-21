const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
