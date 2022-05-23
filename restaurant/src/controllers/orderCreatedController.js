import {save} from '../services/restaurantService.js';

async function orderCreatedMessageReceived(message, correlationId) {
  return await save(JSON.parse(message.value.toString()), correlationId);
}

export async function orderCreatedController(topic, kafkaClient) {
  await kafkaClient.addConsumer(topic, orderCreatedMessageReceived);
}
