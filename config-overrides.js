const path = require('path');
const webpack = require('webpack');
const { override } = require('customize-cra');

const dotenv = require('dotenv');
dotenv.config();

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
     "buffer": require.resolve("buffer/"),
     "process": require.resolve("process/browser"),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]);
  return config;
};