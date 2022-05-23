import {cancel, update} from '../services/orderService.js';

function updateOrderMessageReceived(message, correlationId) {
  return update(JSON.parse(message.value.toString(), correlationId));
}

function cancelOrderMessageReceived(message, correlationId) {
  return cancel(JSON.parse(message.value.toString(), correlationId));
}

export function updateOrderConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, updateOrderMessageReceived);
}

export function cancelOrderConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, cancelOrderMessageReceived);
}
