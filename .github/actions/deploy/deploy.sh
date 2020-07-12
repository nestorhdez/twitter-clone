# Deploy a Vue.js project to Github pages

# Your local folder of the project has to have the same name
# as the Github repository

git config --local user.email "${INPUT_EMAIL}"
git config --local user.name "${GITHUB_ACTOR}"

BASE=$(pwd)
PROJECT=${PWD##*/}
COMMIT=$(git log -1 --pretty=%B)

[[ -n $COMMIT ]] || COMMIT="Initial dist subtree commit"

git checkout gh-pages

# Create vue.config file with the name of the project
echo "module.exports = { publicPath: '$PROJECT' }" > $BASE/vue.config.js

# Comment the dist folder to push it to github
sed -i -e 's/^\/dist.*/#\/dist/g' $BASE/.gitignore

npm run build

git add dist && git commit -m "$COMMIT"
git subtree push --prefix dist origin gh-pages

# Remove the comment to the dist folder
sed -i -e 's/^#\/dist/\/dist/g' /Users/nestorhdez/Desktop/.gitignore

rm $BASE/vue.config.js

echo Deployed 🚀!