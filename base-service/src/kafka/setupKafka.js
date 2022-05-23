import {Kafka} from 'kafkajs';
import createDebug from 'debug';
import {createOffset} from "./offsetManager.js";
import {Consumer} from "./consumerController.js";
import {producerController} from "./producerController.js";

const debug = createDebug('kafka:admin');

const consumers = new Map();
const producers = new Set();

export async function kafkaConnect(clientId, brokers, producerTopics, consumerTopics, partitions, groupId) {
  const topics = [...producerTopics, ...consumerTopics]
  debug('clientId', clientId);
  debug('brokers', brokers);
  debug('topics', topics);
  debug('partitions', partitions);
  debug('groupId', groupId);

  const kafka = new Kafka({clientId, brokers});
  const admin = kafka.admin();
  await admin.connect();
  const currentTopics = await admin.listTopics();
  debug('broker current topics', currentTopics);

  await Promise.all(
    topics.map(async topic => {
      if (!currentTopics.includes(topic)) {
        await admin.createTopics({
          topics: [{topic}],
          waitForLeaders: true,
        });
        await admin.createPartitions({
          topicPartitions: [{topic, count: partitions}],
        });
      }
      if (consumerTopics.includes(topic)) {
        const offsets = await admin.fetchOffsets({groupId, topic});
        createOffset(topic, offsets);
      }
      return Promise.resolve();
    }));
  await admin.disconnect();
  return kafka;
}

export async function addConsumer(kafka, topic, groupId, eachMessage) {
  if (!consumers.has(groupId)) {
    consumers.set(groupId, new Consumer(kafka, groupId))
  }
  const consumer = consumers.get(groupId);
  await consumer.addTopic(topic, eachMessage);
}

export async function addProducer(kafka, topic) {
  const {producer, send} = await producerController(kafka, topic);
  producers.add(producer);
  return send;
}

export async function runAll() {
  const toRun = Array.from(consumers.values());
  return Promise.all(toRun.map(consumer => consumer.runConsumer()));
}

export async function kafkaDisconnect() {
  return Promise.all([
    ...Array.from(producers),
    ...Array.from(consumers.values())]
    .map(client => client.disconnect()));
}
