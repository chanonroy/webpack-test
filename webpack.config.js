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
    vendor: path.join(SRC_DIR, 'js/vendor.js')
  },
  output: {
    path: DIST_DIR,
    filename: 'js/[name].[hash].js', // '[name].[hash].js'
  },
  resolve: {
    alias: {
      vue: process.env.NODE_ENV === 'prod' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2016'] }
        }],
        include: SRC_DIR,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader" }, // css-loader?minimize
          ],
          fallback: "style-loader"
        }),
        include: SRC_DIR,
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
        }),
        include: SRC_DIR,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        include: SRC_DIR,
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        },
        include: SRC_DIR,
     }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CleanWebpackPlugin(['dist'], {
      // remove old dist on build
      root: BASE_DIR,
      verbose: true,
      dry: false,
    }),
    new ExtractTextPlugin({
        filename: "css/[name].[contenthash].css", // [name].[contenthash].css
        // disable: process.env.NODE_ENV === "development"
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'templates/base.html'),
      filename: path.join(DIST_DIR, 'templates/base.html'),
      chunks: ['vendor', 'main'],
    })
  ],
};

// PRODUCTION SETTINGS
if (process.env.NODE_ENV === 'prod') {

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"prod"' } }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false }
    }),

    new webpack.LoaderOptionsPlugin({ minimize: true }),

  ]);
}
