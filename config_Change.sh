#!/bin/sh

#curl -X POST http://localhost:3000/api/config -H 'Content-Type: application/json' -d '{"restaurant":{"post":{"response":404,"delay":50,"randomDelay":50}}}'

curl -X POST http://localhost:3000/api/config -H 'Content-Type: application/json' -d '{"payment":{"post":{"response":401}}}'


