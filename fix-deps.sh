#!/bin/bash

echo "Cleaning up node_modules..."
rm -rf node_modules
rm -rf .expo
rm -rf yarn.lock
rm -rf package-lock.json

# Modify package.json to temporarily remove dependency conflicts
echo "Modifying package.json to prevent conflicts..."
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Remove overrides/resolutions if they exist
  delete pkg.overrides;
  delete pkg.resolutions;

  // Save the modified package.json
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

echo "Installing basic dependencies first..."
npm install --no-save expo expo-router expo-status-bar react-native --force

echo "Installing React dependencies..."
npm install --no-save react@18.3.1 react-dom@18.3.1

echo "Clearing Metro cache and starting the app in offline mode..."
npx expo start --clear --offline
