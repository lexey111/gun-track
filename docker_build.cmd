#!/bin/bash
docker build -f Dockerfile.prod -t gun-track .
docker run --name temp gun-track
docker cp temp:/app/dist ./dist
docker rm temp
docker image rm gun-track
