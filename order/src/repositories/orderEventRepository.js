export let publishMessageOrderCreated;

export async function orderCreatedRepository(topic, kafkaClient) {
  publishMessageOrderCreated = await kafkaClient.addProducer(topic);
}

