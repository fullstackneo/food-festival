const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    
    new BundleAnalyzerPlugin({
      // the report outputs to an HTML file in the dist folder
      analyzerMode: 'static',
    }),
    new WebpackPwaManifest({
      name: 'Food Event',
      short_name: 'Foodies',
      description: 'An app that allows you to view upcoming food events.',
      // specify the homepage for the PWA relative to the location of the manifest file.
      start_url: '../index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      // generate unique fingerprints like this: manifest.lhge325d.json
      fingerprints: false,
      // The inject property determines whether the link to the manifest.json is added to the HTML
      inject: false,
      icons: [
        {
          src: path.resolve('./assets/img/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  devServer: {
    static: __dirname,
    // inline: true,
    host: '0.0.0.0',
    port: 8080,
  },
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets/');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  mode: 'development',
};
