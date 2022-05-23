import {mongoConnect, mongoDisconnect} from "./mongo/setupMongo.js";
import {addConsumer, addProducer, runAll, kafkaConnect, kafkaDisconnect} from './kafka/setupKafka.js'

export class Server {

  kafkaClient;
  mongoClient;

  constructor() {
    const errorTypes = ['unhandledRejection', 'uncaughtException']
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
    errorTypes.map(this.#onError);
    signalTraps.map(this.#onSignalTraps);
  }

  static async build({kafkaConfig, mongoConfig}) {
    const instance = new Server();
    if (kafkaConfig) {
      instance.kafkaClient = await instance.#setupKafkaClient(kafkaConfig);
    }
    if (kafkaConfig) {
      instance.mongoClient = await instance.#setupMongoClient(mongoConfig);
    }
    return instance;
  }

  async run() {
    cons
  }

  async #setupKafkaClient({clientId, brokers, producerTopics, consumerTopics, partitions, groupId}) {
    const kafkaClient = await kafkaConnect(clientId, brokers, producerTopics, consumerTopics, partitions, groupId);

    return {
      addConsumer: (topic, eachMessage) => addConsumer(kafkaClient, topic, groupId, eachMessage),
      addProducer: (topic) => addProducer(kafkaClient, topic),
      runConsumers: () => runAll(),
    }
  }

  async #setupMongoClient({mongoUrl}) {
    await mongoConnect(mongoUrl);
  }

  #onError(type) {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        await Promise.all([kafkaDisconnect(), mongoDisconnect()]);
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    })
  }

  #onSignalTraps(type) {
    process.once(type, async () => {
      try {
        await Promise.all([kafkaDisconnect(), mongoDisconnect()]);
      } finally {
        process.kill(process.pid, type);
      }
    })
  }
}
