echo "Building dotnet project dependencies"
cd ./Core
dotnet restore
cd ../Integration.EntityFramework
dotnet restore
cd ../Test.Unit
dotnet restore
cd ../UI
dotnet restore
echo "All dependencies built"

cd ../UI.React
echo "Building React dependencies"
npm install
echo "Building JS and CSS bundles"
webpack
echo "Project build complete"

echo "Project ready...run 'dotnet run' in UI project to launch"
