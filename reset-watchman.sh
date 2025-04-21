#!/bin/bash

echo "Stopping Watchman server..."
watchman watch-del-all
watchman shutdown-server

echo "Cleaning Metro cache..."
rm -rf $TMPDIR/metro-*

echo "Removing specific watchman directories..."
watchman watch-del '/Users/aviralgarg/Everything'
watchman watch-project '/Users/aviralgarg/Everything/project'

echo "Resetting Node modules cache..."
rm -rf node_modules/.cache

echo "Done! Now restart your dev server with: npm start"
