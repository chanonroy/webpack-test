var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BASE_DIR = path.resolve(__dirname);
var SRC_DIR = path.resolve(__dirname, './src');
var DIST_DIR = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    main: path.join(SRC_DIR, 'js/main.js'),
  },
  output: {
    path: DIST_DIR,
    filename: 'js/[name].[hash].js', // '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: SRC_DIR
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [
              { loader: "css-loader?minimize" }, // css-loader?minimize
              { loader: "postcss-loader",
                options: {
                  plugins() { return [require('autoprefixer')({ browsers: ['last 3 versions'] })]; }
                }
              },
              { loader: "sass-loader" }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
       test: /\.(png|jpg|gif|svg|ico)$/,
       loader: 'file-loader',
       options: {
         name: 'assets/[name].[ext]'
       }
     }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
        filename: "css/[name].[contenthash].css", // [name].[contenthash].css
        // disable: process.env.NODE_ENV === "development"
    }),
    new HtmlWebpackPlugin({
      filename: path.join(DIST_DIR, 'templates/base.html'),
      template: path.join(SRC_DIR, 'templates/base.html'),
      chunks: ['main'],
    })
  ],
};

// PRODUCTION SETTINGS
if (process.env.NODE_ENV === 'production') {

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),

    new webpack.LoaderOptionsPlugin({ minimize: true }),

    new CleanWebpackPlugin(['dist'], {
      // remove old dist on build
      root: BASE_DIR,
      verbose: true,
      dry: false,
    }),

  ]);
}
