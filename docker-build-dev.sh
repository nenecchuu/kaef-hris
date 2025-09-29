#!/bin/sh

# Variabel untuk nama image dan container
IMAGE_NAME="luminakra-sample-app:dev"
CONTAINER_NAME="luminakra_sample_app_dev"
DOCKERFILE_PATH="./dockerfile.prod"

# Build Docker image
docker build -t $IMAGE_NAME -f $DOCKERFILE_PATH .

# Stop and remove container if it exists
if [ $(docker ps -a -q -f name=$CONTAINER_NAME) ]; then
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

# Run container with the specified name
docker run --name $CONTAINER_NAME -dp 1700:80 $IMAGE_NAME
