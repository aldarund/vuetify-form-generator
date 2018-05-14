var webpack = require("webpack")
var path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = [
  {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/dist/",
      libraryTarget: "umd",
      umdNamedDefine: true,
      globalObject: "this",
      filename: "vuetify-form-generator.js"
    },
    plugins: [
      // make sure to include the plugin!
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            // postcss: [require('postcss-cssnext')()]
            // options: {
            //   extractCSS: true
            // }
            loaders: {}
          }
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: ["css-loader"]
        },
        {
          test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: "url-loader?limit=100000"
        }
      ]
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    },
    performance: {
      hints: false
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    devtool: "#source-map"
  }
]
