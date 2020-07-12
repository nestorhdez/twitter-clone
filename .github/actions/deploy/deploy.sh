#!/bin/sh
set -e

# Deploy a Vue.js project to Github pages

# Your local folder of the project has to have the same name
# as the Github repository

git config --local user.email "${INPUT_EMAIL}"
git config --local user.name "${GITHUB_ACTOR}"
echo git config setted.

PROJECT=${PWD##*/}
COMMIT=$(git log -1 --pretty=%B)

[[ -n $COMMIT ]] || COMMIT="Initial dist subtree commit"

git checkout gh-pages

# Create vue.config file with the name of the project
echo "module.exports = { publicPath: '$PROJECT' }" > ./vue.config.js
echo Vue config created.

# Comment the dist folder to push it to github
rm .gitignore

npm run build

git add dist && git commit -m "$COMMIT"
git subtree push --prefix dist origin gh-pages

echo Deployed 🚀!