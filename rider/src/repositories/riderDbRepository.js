import createDebug from 'debug';
import {RiderEntity, STATUS_CANCELLED, STATUS_CREATED} from "../models/riderEntity.js";

const debug = createDebug('mongo:rider:repository');

export async function findRider(orderId) {
  return await RiderEntity.findOne({orderId});
}

export async function saveRider(request) {
  return request.state === STATUS_CREATED ? await saveCreatedRider(request) : await saveCancelledRider(request);
}

async function saveCreatedRider(rider) {
  const riderEntity = new RiderEntity(rider);
  debug('to save', rider, riderEntity);
  await riderEntity.save();
  return riderEntity
}

async function saveCancelledRider(rider) {
  const riderEntity = new RiderEntity(rider);
  debug('to save', rider, riderEntity);
  await riderEntity.save();
  return riderEntity;
}

export async function cancelRider(orderId) {
  return await RiderEntity.findOneAndUpdate({orderId}, {status: STATUS_CANCELLED});
}
