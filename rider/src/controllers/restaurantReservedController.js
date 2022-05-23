import {save} from '../services/riderService.js';

async function restaurantReservedMessageReceived(message, correlationId) {
  return await save(JSON.parse(message.value.toString()), correlationId);
}

export async function restaurantReservedController(topic, kafkaClient) {
  await kafkaClient.addConsumer(topic, restaurantReservedMessageReceived);
}
