var path = require("path")
  , webpack = require("webpack")
  ;

module.exports = {
  progress: true,
  devtool: 'inline-source-map',
  entry: {
    app: ["webpack/hot/dev-server", "./src/entry.js"]
  },
  output: {
    path: path.resolve(__dirname, "../static"),
    filename: "client.js"
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
  plugins: [
     new webpack.HotModuleReplacementPlugin()
  ]
};