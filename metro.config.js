// Simple metro configuration for Expo projects
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable the Expo React Native Transformer
  transformer: {
    // This is not required but prevents some issues
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  // Fixed issue with ExpoMetroConfig.loadAsync
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: ['glb', 'gltf', 'png', 'jpg', 'ttf', 'otf']
  }
});

module.exports = config;
