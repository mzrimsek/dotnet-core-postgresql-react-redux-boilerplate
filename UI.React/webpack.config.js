const webpack = require('webpack');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : 'source-map',
  resolve : {
    root       : 'src',
    extensions : ['', '.js', '.jsx', '.json']
  },
  module : {},
  plugins: []
};

const APP_ENTRY = './src/main.jsx';

webpackConfig.entry = {
  app : [APP_ENTRY],
  vendor : [ 'react', 'react-redux', 'react-router', 'redux' ]
};

webpackConfig.output = {
  filename   : `[name].js`,
  path       : '../UI/wwwroot',
  publicPath : '/'
};

webpackConfig.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      unused    : true,
      dead_code : true,
      warnings  : false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names : ['vendor']
  })
);

webpackConfig.module.loaders = [{
    test    : /\.(js|jsx)$/,
    exclude : /node_modules/,
    loader  : 'babel',
    query   : {
      cacheDirectory : true,
      plugins        : ['transform-runtime'],
      presets        : ['es2015', 'react', 'stage-0']
    }
  }, 
  {
    test   : /\.json$/,
    loader : 'json'
}];

const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
});
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
});

webpackConfig.sassLoader = {
  includePaths : './src/styles'
};

webpackConfig.postcss = [
  cssnano({
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    },
    discardComments : {
      removeAll : true
    },
    discardUnused : false,
    mergeIdents   : false,
    reduceIdents  : false,
    safe          : true,
    sourcemap     : true
  })
];

webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
);

webpackConfig.module.loaders.filter((loader) =>
  loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
  const first = loader.loaders[0]
  const rest = loader.loaders.slice(1)
  loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
  delete loader.loaders
});

webpackConfig.plugins.push(
  new ExtractTextPlugin('[name].css', {
    allChunks : true
  })
);

module.exports = webpackConfig;
