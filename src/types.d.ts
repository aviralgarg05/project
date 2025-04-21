// Global type declarations for React Native
declare global {
  interface ErrorUtils {
    getGlobalHandler(): (error: Error, isFatal: boolean) => void;
    setGlobalHandler(callback: (error: Error, isFatal: boolean) => void): void;
  }
  
  var ErrorUtils: ErrorUtils;
}

// Make this file a module
export {};
