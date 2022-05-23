import {Server} from "@sanguino/tfm-base-service";
import {riderAssignedRepository, riderCancelledRepository} from './repositories/riderEventsRepository.js';
import {restaurantReservedController} from './controllers/restaurantReservedController.js';
import {orderRollbackController} from './controllers/orderRollbackController.js';

const {
  MONGO_URL,
  MONGO_DB,
  KAFKA_CLIENT_ID,
  KAFKA_BROKERS,
  KAFKA_TOPIC_RESTAURANT_RESERVED,
  KAFKA_TOPIC_RIDER_ASSIGNED,
  KAFKA_TOPIC_RIDER_CANCELLED,
  KAFKA_TOPIC_PAYMENT_CANCELLED,
  KAFKA_TOPICS_PARTITIONS,
  KAFKA_GROUP_ID
} = process.env;

const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS.split(','),
  producerTopics: [KAFKA_TOPIC_RIDER_ASSIGNED, KAFKA_TOPIC_RIDER_CANCELLED],
  consumerTopics: [KAFKA_TOPIC_RESTAURANT_RESERVED, KAFKA_TOPIC_PAYMENT_CANCELLED],
  partitions: Number(KAFKA_TOPICS_PARTITIONS),
  groupId: KAFKA_GROUP_ID,
}

const mongoConfig = {
  mongoUrl: `mongodb://${MONGO_URL}/${MONGO_DB}`
};

const {kafkaClient} = await Server.build({kafkaConfig, mongoConfig});

await riderAssignedRepository(KAFKA_TOPIC_RIDER_ASSIGNED, kafkaClient);
await riderCancelledRepository(KAFKA_TOPIC_RIDER_CANCELLED, kafkaClient);

await restaurantReservedController(KAFKA_TOPIC_RESTAURANT_RESERVED, kafkaClient);
await orderRollbackController(KAFKA_TOPIC_PAYMENT_CANCELLED, kafkaClient);

await kafkaClient.runConsumers();
