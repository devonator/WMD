jshint --reporter=node_modules/jshint-stylish `find . -type d \( -path ./node_modules -o -path ./docs -o -path ./www \) -prune -o -regex ".*\.js" -print`