// const HtmlWebPackPlugin = require('html-webpack-plugin');

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: 'html-loader',
//             options: { minimize: true }
//           }
//         ]
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         }
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./public/index.html",
//       filename: "./index.html"
//     })
//   ]
// };

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // adjust the entry point based on your project
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // adjust the output path based on your project
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
