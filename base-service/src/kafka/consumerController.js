import createDebug from 'debug';
import {storeOffset} from "./offsetManager.js";

const debug = createDebug('kafka:consumer');

export class Consumer {
  #kafka;
  #groupId;
  #consumeMessages = new Map();
  #consumer;

  constructor(kafka, groupId) {
    this.#kafka = kafka;
    this.#groupId = groupId;
  }

  async addTopic(topic, consumeMessage) {
    if (!this.#consumer) {
      this.#consumer = this.#kafka.consumer({groupId: this.#groupId});
      await this.#consumer.connect()
      debug('consumer connected');
    }

    await this.#consumer.subscribe({topic, fromBeginning: true})
    debug('consumer subscribed to', topic);

    this.#consumeMessages.set(topic, consumeMessage);
  }

  async runConsumer() {
    await this.#consumer.run({
      autoCommit: false,
      eachMessage: async ({topic, partition, message}) => {
        const value = JSON.parse(message.value.toString());
        const correlationId = message.headers['correlation-id'].toString();
        debug(topic, 'Message:', {
          partition,
          offset: message.offset,
          value,
          correlationId,
        });
        this.#consumeMessages.get(topic)(message, correlationId).then(async () => {
          const newOffset = storeOffset(topic, partition, message.offset);
          debug('consumer newOffset value', newOffset);
          if (newOffset) {
            debug('consumer newOffset', newOffset);
            await this.#consumer.commitOffsets([
              {topic, partition, offset: newOffset},
            ]);
          }
        });
      },
    });
  }
}
