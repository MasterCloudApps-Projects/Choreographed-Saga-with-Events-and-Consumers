export let publishMessageRestaurantReserved;
export let publishMessageRestaurantCancelled;

export async function restaurantReservedRepository(topic, kafkaClient) {
  publishMessageRestaurantReserved = await kafkaClient.addProducer(topic);
}

export async function restaurantCancelledRepository(topic, kafkaClient) {
  publishMessageRestaurantCancelled = await kafkaClient.addProducer(topic);
}

