const { addBabelPlugin, override } = require('customize-cra');
/**
 * addBabelPlugin: is a function which we can add Babel's plugins
 */

module.exports = override(
  // adding Babel's plugin
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src', // which folder we are putting the most of my codes
      // now we can import directly from /src folder.
    },
  ])
);
