const path = require('path');
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  entry: './assets/js/script.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  mode: 'development',
};
