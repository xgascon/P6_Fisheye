const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    photographer: './src/photographer.js', 
    tags: './src/tags.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[name].js',
  },
};