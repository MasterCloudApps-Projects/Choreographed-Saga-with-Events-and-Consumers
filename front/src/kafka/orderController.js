import {updateRestaurant, updateRider, updatePayment, cancelOrder} from "../services/b4fService.js";

export function updateRestaurantConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, (message, correlationId) => updateRestaurant(JSON.parse(message.value.toString()), correlationId));
}

export function updateRiderConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, (message, correlationId) => updateRider(JSON.parse(message.value.toString()), correlationId));
}

export function updatePaymentConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, (message, correlationId) => updatePayment(JSON.parse(message.value.toString()), correlationId));
}

export function cancelOrderConsumer(topic, kafkaClient) {
  kafkaClient.addConsumer(topic, (message, correlationId) => cancelOrder(JSON.parse(message.value.toString()), correlationId));
}
