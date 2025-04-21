// This file should be imported at the top of your index.js file

console.log('Disabling Expo updates system...');

// Block expo-updates module
if (typeof require !== 'undefined' && require.cache) {
  // Find any modules related to updates in the cache
  Object.keys(require.cache).forEach(modulePath => {
    if (modulePath.includes('expo-updates') || modulePath.includes('over-the-air')) {
      // Remove them from cache to prevent them from executing
      delete require.cache[modulePath];
      console.log(`Removed from cache: ${modulePath}`);
    }
  });
}

// Preemptively define these functions to prevent errors
const mockExpoUpdates = {
  checkForUpdateAsync: async () => ({ isAvailable: false }),
  fetchUpdateAsync: async () => ({ isNew: false }),
  reloadAsync: async () => {},
  reload: async () => {},
  addListener: () => ({ remove: () => {} }),
  useUpdateSystem: false,
  isEnabled: false
};

// Try to override global.expo
if (typeof global !== 'undefined' && global.expo) {
  try {
    global.expo.updates = mockExpoUpdates;
  } catch (e) {
    console.warn('Failed to override global.expo.updates:', e);
  }
}

// Try to override module resolution
if (typeof global !== 'undefined' && global.require) {
  const originalRequire = global.require;
  global.require = function(id) {
    if (typeof id === 'string' && id.includes('expo-updates')) {
      console.log(`[MOCK] Intercepted require for ${id}`);
      return mockExpoUpdates;
    }
    return originalRequire(id);
  };
}

module.exports = {
  disableUpdates: true,
  mockExpoUpdates
};
