#!/usr/bin/env bash

set -e

MONGO_SERVERS=($(echo $MONGO_URL | tr "," "\n"))

for i in "${MONGO_SERVERS[@]}"
do
    ./wait-for-it.sh --timeout=60 $i
done

./wait-for-it.sh --timeout=30 "${KAFKA_BROKERS}"

node -r dotenv/config src/server.js
