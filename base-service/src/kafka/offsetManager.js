import createDebug from 'debug';

const debug = createDebug('kafka:offsetManager');

const store = {};

export function createOffset(topic, offsets) {
  offsets.forEach( ({partition, offset}) => {
     const key = Symbol.for({topic, partition});
     const current = Number(offset) >= 0 ? Number(offset) : 0;
     store[key] = {current, waiting: new Set()};
  });
  debug('createOffset', topic, store);
}

export function storeOffset(topic, partition, offset) {
  const key = Symbol.for({topic, partition});
  const {current, waiting} = store[key];
  debug('storeOffset(topic, partition, offset)', topic, partition, offset);
  debug('storeOffset - key', key);
  debug('storeOffset -  store[key]',  store[key]);
  waiting.add(Number(offset));
  const orderedWaiting = Array.from(waiting).sort((a, b) => a-b);
  const newOffset = orderedWaiting.reduce((newOffset, elem) => {
    if (newOffset >= elem) {
      waiting.delete(elem);
    }
    return newOffset === elem ? elem + 1 : newOffset;
  }, current);

  if (newOffset !== current) {
    store[key].current = newOffset;
    return String(newOffset);
  }
  return false;
}
