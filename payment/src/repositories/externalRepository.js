import got from 'got';
import createDebug from 'debug';
import {STATUS_CREATED, STATUS_REJECTED} from "../models/paymentEntity.js";

const debug = createDebug('repository:external');
const {EXTERNALS_URL} = process.env;

export async function externalPayment(paymentDto) {

  const request = {
    orderId: paymentDto.orderId,
    amount: paymentDto.price
  };

  debug('to save', request);
  const {body, statusCode} = await got.post(EXTERNALS_URL, {json: request, throwHttpErrors: false});
  debug('response', statusCode, body);

  return {
    ...request,
    ...JSON.parse(body),
    status: statusCode < 400 ? STATUS_CREATED : STATUS_REJECTED,
  };
}
