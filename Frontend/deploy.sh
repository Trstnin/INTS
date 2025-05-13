#!/bin/bash

# Clean up
rm -rf dist

# Install dependencies
npm install

# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod
