#!/bin/bash

# Go to JAR Path
echo "Go To JAR File"

if [ $# -eq 0 ]
  then
    cd /Users/flbk/Documents/Development/Java/Vertx/is-there-a-movie/build/libs
else
    cd $1
fi

# Run Server
echo "Start Server"

java -jar botomo-1.0-SNAPSHOT-fat.jar -Dhttp.port=8080 -Ddbname="botomo" -Ddburl="mongodb://localhost:27017"