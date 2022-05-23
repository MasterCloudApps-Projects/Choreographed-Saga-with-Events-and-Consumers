#!/bin/sh

set -e

cd order
cp ~/.npmrc .
docker build -t sanguino/order:1.0.0 -f Dockerfile .
rm -rf .npmrc
cd ..

cd restaurant
cp ~/.npmrc .
docker build -t sanguino/restaurant:1.0.0 -f Dockerfile .
rm -rf .npmrc
cd ..

cd rider
cp ~/.npmrc .
docker build -t sanguino/rider:1.0.0 -f Dockerfile .
rm -rf .npmrc
cd ..

cd payment
cp ~/.npmrc .
docker build -t sanguino/payment:1.0.0 -f Dockerfile .
rm -rf .npmrc
cd ..

cd front
cp ~/.npmrc .
docker build -t sanguino/front:1.0.0 -f Dockerfile .
rm -rf .npmrc
cd ..

cd externals
docker build -t sanguino/externals:1.0.0 .
cd ..

cd notifications
docker build -t sanguino/notifications:1.0.0 .
cd ..

cd kafkaConnectMongoDb
docker build -t sanguino/kafka-connect-mongodb:1.0.0 .

