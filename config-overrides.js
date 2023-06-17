const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (config) => {
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    new TsconfigPathsPlugin(),
  ];
  config.resolve.alias = {
    '@': path.resolve(__dirname, 'src'),
  };
  config.resolve.extensions = ['.ts', '.js', '.tsx', '.jsx'];

  return config;
};
