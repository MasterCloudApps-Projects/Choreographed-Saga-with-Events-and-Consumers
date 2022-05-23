import {save} from '../services/paymentRequestService.js';

async function riderAssignedMessageReceived(message, correlationId) {
  return await save(JSON.parse(message.value.toString()), correlationId);
}

export async function riderAssignedController(topic, kafkaClient) {
  await kafkaClient.addConsumer(topic, riderAssignedMessageReceived);
}
