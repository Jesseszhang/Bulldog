const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (opt) {
  var path = require('path')
  var config = require(path.resolve(__dirname, `./index`))
  var utils = require(path.resolve(__dirname, `./../utils`))
  var webpack = require('webpack')

  var appName = opt.appName

  var baseConf = {
    entry: {
      app: [
        'babel-polyfill',
        path.resolve(__dirname, `${config.global.root}/${appName}/main.js`)
      ]
    },

    output: {
      publicPath: config.dev.assetsPublicPath,
      path: config.build.assetsRoot,
      filename: '[name].[hash].js'
    },

    stats: 'verbose',

    context: path.resolve(__dirname, 'app'),

    resolve: {
      modules: ["node_modules", path.resolve(__dirname, `${config.global.root}/src/scss`)],
      extensions: ['.js'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js' for webpack 1
        'root': path.resolve(__dirname, `${config.global.root}`),
        'src': path.resolve(__dirname, `${config.global.root}/src`),
        'ex': path.resolve(__dirname, `${config.global.root}/example`),
        'exAsset': path.resolve(__dirname, `${config.global.root}/example/client/asset`)
      }
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          query: {
            loaders: utils.cssLoaders()
          }
        }, {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }, {
          test: /\.(html|tpl)$/,
          loader: 'html-loader'
        }, {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }, {
          test: /\.json$/,
          loader: 'json-loader'
        },  {
          test: /\.pug$/,
          loader: 'pug-loader'
        }, {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }, {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }, {
          test: /\.ts$/,
          exclude: /node_modules|vue\/src/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            esModule: true
          }
        }
      ]
    },

    performance: {
      maxEntrypointSize: 104857600,
      maxAssetSize: 10485760
    }
  }

  return baseConf
}
