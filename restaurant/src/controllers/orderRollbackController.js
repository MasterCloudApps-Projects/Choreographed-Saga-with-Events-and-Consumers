import {compensate} from '../services/restaurantService.js';

async function orderRollbackMessageReceived(message, correlationId) {
  return await compensate(JSON.parse(message.value.toString(), correlationId));
}

export async function orderRollbackController(topic, kafkaClient) {
  await kafkaClient.addConsumer(topic, orderRollbackMessageReceived);
}
