<<<<<<< HEAD
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
=======
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
>>>>>>> 6e2008b7b6b65abde9df2622d42fb2cf272ef3af
};