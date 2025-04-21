module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Remove the module-resolver plugin that's causing issues
    plugins: []
  };
};
