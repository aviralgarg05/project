// Mock implementation of expo-updates
const mockUpdates = {
  checkForUpdateAsync: async () => ({ isAvailable: false }),
  fetchUpdateAsync: async () => ({ isNew: false }),
  reloadAsync: async () => {},
  reload: async () => {},
  addListener: () => ({ remove: () => {} }),
  useUpdateSystem: false,
  isEnabled: false, 
  isUsingEmbeddedAssets: true,
  createdAt: new Date(),
  manifest: {},
  releaseChannel: "default",
  updateId: null,
  channel: "default",
  runtimeVersion: "1.0.0"
};

// Export the mock as default
export default mockUpdates;
