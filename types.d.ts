// Global type declarations
declare global {
  interface ErrorUtils {
    getGlobalHandler(): (error: Error, isFatal: boolean) => void;
    setGlobalHandler(callback: (error: Error, isFatal: boolean) => void): void;
  }
  
  var ErrorUtils: ErrorUtils;
}

// Make sure this file is treated as a module
export {};
