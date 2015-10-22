var webpack = require('webpack')
  , config = require('./prod.config')
  ;

config.cache = true;
config.debug = true;
config.devtool = "eval";

config.output.publicPath = "http://localhost:3000/static/";

config.entry.unshift(
	"webpack-dev-server/client?http://localhost:3000",
  "webpack/hot/dev-server"
);

config.plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  }),
];

module.exports = config;