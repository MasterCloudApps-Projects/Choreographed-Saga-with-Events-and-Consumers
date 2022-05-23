import createDebug from 'debug';

import {publishMessageRiderAssigned, publishMessageRiderCancelled} from '../repositories/riderEventsRepository.js'
import {cancelRider, findRider, saveRider} from '../repositories/riderDbRepository.js';
import {externalRider} from "../repositories/externalRepository.js";
import {STATUS_CREATED} from '../models/riderEntity.js';
import {RiderAssigned} from "../dtos/RiderAssigned.js";
import {RiderCancelled} from "../dtos/RiderCancelled.js";

const debug = createDebug('service:rider');

async function createAndSaveRider(riderDto) {
  const riderToSave = await externalRider(riderDto);
  return await saveRider(riderToSave);
}

export async function save(riderDto, correlationId) {
  debug('save', riderDto, correlationId);
  const rider = await findRider(riderDto.orderId) || await createAndSaveRider(riderDto);
  debug('actual', rider);
  return rider.status === STATUS_CREATED ?
    await publishMessageRiderAssigned(JSON.stringify(new RiderAssigned(rider)), correlationId) :
    await publishMessageRiderCancelled(JSON.stringify(new RiderCancelled(rider)), correlationId);
}

export async function compensate({orderId}) {
  return await cancelRider(orderId);
}
