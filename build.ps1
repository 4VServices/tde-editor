cd ui
echo "Building the UI"
npm run build
cd ../marklogic
echo "Loading to MarkLogic"
./gradlew mlLoadModules
cd ..
