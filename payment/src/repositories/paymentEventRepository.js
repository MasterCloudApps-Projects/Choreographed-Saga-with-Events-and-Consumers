export let publishMessagePaymentDone;
export let publishMessagePaymentCancelled;

export async function paymentDoneRepository(topic, kafkaClient) {
  publishMessagePaymentDone = await kafkaClient.addProducer(topic);
}

export async function paymentCancelledRepository(topic, kafkaClient) {
  publishMessagePaymentCancelled = await kafkaClient.addProducer(topic);
}

