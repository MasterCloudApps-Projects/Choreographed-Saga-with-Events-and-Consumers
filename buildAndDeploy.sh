#!/bin/sh

set -e

./buildAllDockerImages.sh
docker-compose up -d
