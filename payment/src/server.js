import {Server} from "@sanguino/tfm-base-service";
import {paymentCancelledRepository, paymentDoneRepository} from './repositories/paymentEventRepository.js';
import {riderAssignedController} from './controllers/riderAssignedController.js';

const {
  MONGO_URL,
  MONGO_DB,
  KAFKA_CLIENT_ID,
  KAFKA_BROKERS,
  KAFKA_TOPIC_RIDER_ASSIGNED,
  KAFKA_TOPIC_PAYMENT_DONE,
  KAFKA_TOPIC_PAYMENT_CANCELLED,
  KAFKA_TOPICS_PARTITIONS,
  KAFKA_GROUP_ID
} = process.env;
const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS.split(','),
  producerTopics: [KAFKA_TOPIC_PAYMENT_DONE, KAFKA_TOPIC_PAYMENT_CANCELLED],
  consumerTopics: [KAFKA_TOPIC_RIDER_ASSIGNED],
  partitions: Number(KAFKA_TOPICS_PARTITIONS),
  groupId: KAFKA_GROUP_ID,
}

const mongoConfig = {
  mongoUrl: `mongodb://${MONGO_URL}/${MONGO_DB}`
};

const {kafkaClient} = await Server.build({kafkaConfig, mongoConfig});

await paymentDoneRepository(KAFKA_TOPIC_PAYMENT_DONE, kafkaClient);
await paymentCancelledRepository(KAFKA_TOPIC_PAYMENT_CANCELLED, kafkaClient);
await riderAssignedController(KAFKA_TOPIC_RIDER_ASSIGNED, kafkaClient);

await kafkaClient.runConsumers();
