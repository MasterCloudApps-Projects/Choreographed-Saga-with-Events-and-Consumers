#!/usr/bin/env bash

set -e

./wait-for-it.sh --timeout=60 "${KAFKA_BROKERS}"

node -r dotenv/config src/server.js
