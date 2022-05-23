import bodyParser from "body-parser";
import express from "express";
import {routes} from "./controllers/orderRouter.js";

import {Server} from "@sanguino/tfm-base-service";
import {cancelOrderConsumer, updateOrderConsumer} from "./controllers/orderController.js";
import {orderCreatedRepository} from "./repositories/orderEventRepository.js";

const {
  MONGO_URL,
  MONGO_DB,
  KAFKA_CLIENT_ID,
  KAFKA_BROKERS,
  KAFKA_TOPIC_ORDER_CREATED,
  KAFKA_TOPIC_RESTAURANT_RESERVED,
  KAFKA_TOPIC_RESTAURANT_CANCELLED,
  KAFKA_TOPIC_RIDER_ASSIGNED,
  KAFKA_TOPIC_RIDER_CANCELLED,
  KAFKA_TOPIC_PAYMENT_DONE,
  KAFKA_TOPIC_PAYMENT_CANCELLED,
  KAFKA_TOPICS_PARTITIONS,
  KAFKA_GROUP_ID
} = process.env;
const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS.split(','),
  producerTopics: [KAFKA_TOPIC_ORDER_CREATED],
  consumerTopics: [
    KAFKA_TOPIC_RESTAURANT_RESERVED,
    KAFKA_TOPIC_RESTAURANT_CANCELLED,
    KAFKA_TOPIC_RIDER_ASSIGNED,
    KAFKA_TOPIC_RIDER_CANCELLED,
    KAFKA_TOPIC_PAYMENT_DONE,
    KAFKA_TOPIC_PAYMENT_CANCELLED
  ],
  partitions: Number(KAFKA_TOPICS_PARTITIONS),
  groupId: KAFKA_GROUP_ID,
}

const mongoConfig = {
  mongoUrl: `mongodb://${MONGO_URL}/${MONGO_DB}`
};

const {kafkaClient} = await Server.build({kafkaConfig, mongoConfig});

updateOrderConsumer(KAFKA_TOPIC_RESTAURANT_RESERVED, kafkaClient);
updateOrderConsumer(KAFKA_TOPIC_RIDER_ASSIGNED, kafkaClient);
updateOrderConsumer(KAFKA_TOPIC_PAYMENT_DONE, kafkaClient);

cancelOrderConsumer(KAFKA_TOPIC_RESTAURANT_CANCELLED, kafkaClient);
cancelOrderConsumer(KAFKA_TOPIC_RIDER_CANCELLED, kafkaClient);
cancelOrderConsumer(KAFKA_TOPIC_PAYMENT_CANCELLED, kafkaClient);

await orderCreatedRepository(KAFKA_TOPIC_ORDER_CREATED, kafkaClient);

await kafkaClient.runConsumers();

const {API_REST_PORT} = process.env;
const server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());
server.use('/api', routes);
server.listen(API_REST_PORT, () => console.log(`Server listening on port ${API_REST_PORT}!`));
