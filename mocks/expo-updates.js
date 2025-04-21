// Mock implementation of expo-updates that never attempts to download updates
export default {
  checkForUpdateAsync: async () => ({ isAvailable: false }),
  fetchUpdateAsync: async () => ({ isNew: false }),
  reloadAsync: async () => {},
  isEmbeddedLaunch: true,
  isFirstLaunch: false,
  manifest: {
    version: "1.0.0",
    bundleUrl: null,
    bundledAssets: [],
    id: "local",
    runtimeVersion: "1",
  },
  releaseChannel: "default",
  updateId: null,
  createdAt: null,
  presentationStyle: "push",
  isEmergencyLaunch: false
};
