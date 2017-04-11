var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: path.join(__dirname, "/client/src/js/app.js"),
  output: {
    path: path.join(__dirname + "/client/dist/"),
    filename: "client.min.js",
    publicPath: '/js/'
  },
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "client/src/",
    historyApiFallback: {
      index: '/index.html'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      { test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/, loader: "url" },
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("css/styles.css", {
      publicPath: '/css/',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
};
