#!/bin/sh

#curl -X POST http://cads.sanguino.cloud.okteto.net/externals/api/config -H 'Content-Type: application/json' -d '{"restaurant":{"post":{"response":404,"delay":50,"randomDelay":50}}}'

curl -X POST http://cads.sanguino.cloud.okteto.net/externals/api/config -H 'Content-Type: application/json' -d '{"payment":{"post":{"response":201, "delay":2000}}}'


