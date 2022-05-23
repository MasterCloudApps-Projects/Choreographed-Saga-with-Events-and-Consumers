import mongoose from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('mongo:setup');

export async function mongoConnect(mongoUrl) {
  await mongoose.connect(mongoUrl);
  debug('mongo connected to', mongoUrl);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
  debug('mongo disconnected');
}
