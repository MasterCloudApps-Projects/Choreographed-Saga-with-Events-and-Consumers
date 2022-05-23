import {compensate} from '../services/riderService.js';

export async function orderRollbackController(topic, kafkaClient) {
  await kafkaClient.addConsumer(topic, (message) => compensate(JSON.parse(message.value.toString())));
}
