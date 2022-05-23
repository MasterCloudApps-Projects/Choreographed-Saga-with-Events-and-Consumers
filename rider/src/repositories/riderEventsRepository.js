export let publishMessageRiderAssigned;
export let publishMessageRiderCancelled;

export async function riderAssignedRepository(topic, kafkaClient) {
  publishMessageRiderAssigned = await kafkaClient.addProducer(topic);
}

export async function riderCancelledRepository(topic, kafkaClient) {
  publishMessageRiderCancelled = await kafkaClient.addProducer(topic);
}
