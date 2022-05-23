import {kafkaClient} from "@sanguino/tfm-base-service";

import {updateRestaurantConsumer, updateRiderConsumer, updatePaymentConsumer, cancelOrderConsumer} from "../kafka/orderController.js";

export async function createKafkaConnection() {

  const {
    KAFKA_CLIENT_ID,
    KAFKA_BROKERS,
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
    producerTopics: [],
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

  const kafka = await kafkaClient(kafkaConfig);

  updateRestaurantConsumer(KAFKA_TOPIC_RESTAURANT_RESERVED, kafka);
  updateRiderConsumer(KAFKA_TOPIC_RIDER_ASSIGNED, kafka);
  updatePaymentConsumer(KAFKA_TOPIC_PAYMENT_DONE, kafka);

  cancelOrderConsumer(KAFKA_TOPIC_RESTAURANT_CANCELLED, kafka);
  cancelOrderConsumer(KAFKA_TOPIC_RIDER_CANCELLED, kafka);
  cancelOrderConsumer(KAFKA_TOPIC_PAYMENT_CANCELLED, kafka);
}
