#!/usr/bin/env bash
cp -f ./package.json ./publish/package.json
mv ./publish/index.js ./publish/index_b
mv ./publish/formAntD.js ./publish/formAntD_b
tsc
find ./publish -type f -name "*.js"|xargs rm -rf
mv ./publish/index_b ./publish/index.js
mv ./publish/formAntD_b ./publish/formAntD.js
npm run build
cd ./publish
#npm login
npm publish
