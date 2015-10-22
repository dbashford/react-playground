var path = require("path")
  , webpack = require("webpack")
  ;

module.exports = {
  target:"web",
  progress: true,
  devtool: false,
  entry: ["./src/entry.js"],
  output: {
    path: path.resolve(__dirname, "../static"),
    filename: "client.js",
    publicPath: "static/"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]',
          'autoprefixer?browsers=last 2 version',
          'sass?outputStyle=expanded&sourceMap'
        ]
      },
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.js']
  },

  // production plugins
  plugins: [
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
};