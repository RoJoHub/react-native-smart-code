const path = require('path');

module.exports = {
  target: 'web',
  entry: ['./CodeGenerator.web.js'],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'CodeGenerator.web.js',
    library: 'CodeGenerator',
    libraryTarget: 'var'
  },
  mode: 'production',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/ }]
  }
};
