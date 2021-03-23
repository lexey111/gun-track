#!/bin/bash
docker build -f Dockerfile.prod -t gunhistory .
docker run --name temp gunhistory
docker cp temp:/app/dist ./dist
docker rm temp
docker image rm gunhistory
