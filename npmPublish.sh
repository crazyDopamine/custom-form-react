#!/usr/bin/env bash
cp -f ./package.json ./publish/package.json
#mv ./publish/index.js ./publish/index_b
#mv ./publish/components.js ./publish/components_b
tsc
find ./publish -type f -name "*.js"|xargs rm -rf
#mv ./publish/index_b ./publish/index.js
#mv ./publish/components_b ./publish/components.js
npm run build
cd ./publish
npm login
npm publish
