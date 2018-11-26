const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/index.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: './dist/bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    port: 3300,
  },
  module: {
    rules: [
        {
            test: /\.jsx?/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]
  },
};