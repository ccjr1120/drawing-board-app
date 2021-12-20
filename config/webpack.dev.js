const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [ new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
});
