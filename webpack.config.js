var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },

  // plugins: [
  //   new UglifyJsPlugin()
  // ]
};