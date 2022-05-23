import createDebug from 'debug';

import {publishMessagePaymentCancelled, publishMessagePaymentDone} from '../repositories/paymentEventRepository.js'
import {findPayment, savePayment} from '../repositories/paymentDbRepository.js'
import {externalPayment} from "../repositories/externalRepository.js";
import {STATUS_CREATED} from "../models/paymentEntity.js";
import {PaymentDone} from "../dtos/PaymentDone.js";
import {PaymentCancelled} from "../dtos/PaymentCancelled.js";

const debug = createDebug('service:payment');

async function createAndSavePayment(paymentDto) {
  const paymentToSave = await externalPayment(paymentDto);
  return await savePayment(paymentToSave);
}

export async function save(paymentDto, correlationId) {
  debug('save', paymentDto, correlationId);
  const payment = await findPayment(paymentDto.orderId) || await createAndSavePayment(paymentDto);
  debug('actual', payment);
  return payment.status === STATUS_CREATED ?
    await publishMessagePaymentDone(JSON.stringify(new PaymentDone(payment)), correlationId) :
    await publishMessagePaymentCancelled(JSON.stringify(new PaymentCancelled(payment)), correlationId);
}
