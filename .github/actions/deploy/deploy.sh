#!/bin/sh
set -e

# Deploy a Vue.js project to Github pages

# Your local folder of the project has to have the same name
# as the Github repository

git config --local user.email "${INPUT_EMAIL}"
git config --local user.name "${GITHUB_ACTOR}"
echo git config setted.

PROJECT=${PWD##*/}

[[ -n $INPUT_COMMIT ]] || INPUT_COMMIT="Initial dist subtree commit"

# Create vue.config file with the name of the project
echo "module.exports = { publicPath: '$PROJECT' }" > ./vue.config.js
echo Vue config created.

npm run build

git add dist && git commit -m "$INPUT_COMMIT"
git subtree push --prefix dist origin gh-pages

echo Deployed 🚀!