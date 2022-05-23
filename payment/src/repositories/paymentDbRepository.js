import createDebug from 'debug';
import {PaymentEntity, STATUS_CREATED} from "../models/paymentEntity.js";

const debug = createDebug('mongo:payment:repository');

export async function findPayment(orderId) {
  return await PaymentEntity.findOne({orderId});
}

export async function savePayment(request) {
  return request.state === STATUS_CREATED ? await saveCreatedPayment(request) : await saveCancelledPayment(request);
}

async function saveCreatedPayment(request) {
  const paymentEntity = new PaymentEntity(request);
  debug('to save', request, paymentEntity);
  await paymentEntity.save();
  return paymentEntity;
}

async function saveCancelledPayment(request) {
  const paymentEntity = new PaymentEntity(request);
  debug('to save', request, paymentEntity);
  await paymentEntity.save();
  return paymentEntity;
}
