var WebpackDevServer = require('webpack-dev-server')
  , webpack = require('webpack')
  , config = require('./dev.config')
  , serverOptions = {
      contentBase: './static',
      quiet: false,
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      publicPath: config.output.publicPath,
      headers: {"Access-Control-Allow-Origin": "*"},
      stats: {colors: true}
    }
  , webpackDevServer = new WebpackDevServer(webpack(config), serverOptions)
  ;

webpackDevServer.listen(3000, "localhost", function() {
  console.info('==> 🚧  Webpack development server listening on %s:%s', "localhost", "3000");
});