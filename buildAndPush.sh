#!/bin/sh

set -e

./buildAllDockerImages.sh

docker push sanguino/order:1.0.0
docker push sanguino/restaurant:1.0.0
docker push sanguino/rider:1.0.0
docker push sanguino/payment:1.0.0
docker push sanguino/front:1.0.0
docker push sanguino/externals:1.0.0
docker push sanguino/notifications:1.0.0
docker push sanguino/kafka-connect-mongodb:1.0.0
