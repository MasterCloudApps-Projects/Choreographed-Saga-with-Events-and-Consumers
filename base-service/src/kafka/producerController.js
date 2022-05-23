import createDebug from 'debug';

const debug = createDebug('kafka:producer');

export async function producerController(kafka, topic) {

  const producer = kafka.producer({
    idempotent: true
  });
  await producer.connect();
  debug('producer', topic, 'connected');

  const send = async (msg, correlationId) => {
    await producer.send({
      topic,
      messages: [
        {
          value: msg,
          headers: {
            'correlation-id': correlationId
        }
        },
      ],
    });
  }

  return {send, producer};
}
