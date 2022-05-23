#!/bin/sh

function replaceEnvVars() {
sed '
     s@${KAFKA_BROKERS}@'"$KAFKA_BROKERS"'@
     s@${MONGO_DB}@'"$MONGO_DB"'@
     s@${MONGO_URL}@'"$MONGO_URL"'@
     s@${MONGO_COLLECTION}@'"$MONGO_COLLECTION"'@
     s@${OUTPUT_TOPIC}@'"$OUTPUT_TOPIC"'@
     ' < $1
}

replaceEnvVars MongoDbSourceConnector.properties > source.properties
replaceEnvVars KafkaWorker.properties > worker.properties

connect-standalone worker.properties source.properties
