'use strict'
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix = new LessPluginAutoPrefix({
  browsers: ['last 15 versions', 'IE 9', 'Opera 12']
})
const LessPluginCleanCSS = require('less-plugin-clean-css')
const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true})
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV
module.exports = {
  mode: NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    publicPath: '/'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.less$/,
        use:
        [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              plugins: [
                autoprefix,
                cleanCSSPlugin
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        },
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/static'),
        to: path.resolve(__dirname, './dist/static'),
        toType: 'dir'
      },
      {
        from: path.resolve(__dirname, './src/data'),
        to: path.resolve(__dirname, './dist/data'),
        toType: 'dir'
      }
    ])
  ]
}
