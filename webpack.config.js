const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const yaml = require('js-yaml');

const buildVariant = process.env.NODE_ENV || 'production';

// Load webpacker.yml file using a YAML reader
const webpackerConfig = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'config/webpacker.yml'), 'utf8'));

// Load all files from app/javascript/packs
const entriesDirectory = path.join(__dirname, `${webpackerConfig[buildVariant].source_path}/${webpackerConfig[buildVariant].source_entry_path}`);

// Set the output path
const publicPath = webpackerConfig[buildVariant].public_output_path;
const outputDir = `${webpackerConfig[buildVariant].public_root_path}/${publicPath}`;

const entries = Object.assign(
  {},
  ...fs
    .readdirSync(entriesDirectory)
    .filter(file => file.endsWith('.js'))
    .map(entry => {
      return {
        [entry.replace('.js', '')]: `${entriesDirectory}/${entry}`,
      };
    }),
);

const nodeEnv = process.env.NODE_ENV || 'nodeEnv';

/* eslint-disable-next-line import/no-commonjs */
module.exports = (env, args) => {
  return {
    mode: args.mode === 'production' ? 'production' : 'development',
    entry: entries,
    output: {
      filename: '[name]-[hash].js',
      path: path.resolve(__dirname, outputDir),
      publicPath: `/${publicPath}/`,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      }),
      new WebpackAssetsManifest({
        integrity: false,
        entrypoints: true,
        writeToDisk: true,
        publicPath: `/${publicPath}/`,
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        ignoreOrder: false,
      }),
    ],
    devServer: {
      publicPath: `/${publicPath}/`,
      port: webpackerConfig.development.dev_server.port,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'media/[name]-[hash].[ext]',
              publicPath: `/${publicPath}/`,
            },
          },
        },
      ],
    },
  };
};
