const path = require('path');

module.exports = function override(config, env) {
  // Add path aliases
  config.resolve.alias['@'] = path.resolve(__dirname, 'src');

  return config;
};
