import got from 'got';
import createDebug from 'debug';
import {STATUS_CREATED, STATUS_REJECTED} from "../models/restaurantEntity.js";

const debug = createDebug('repository:external');
const {EXTERNALS_URL} = process.env;

export async function externalRestaurant(restaurantDto) {

  const request = {
    orderId: restaurantDto.orderId,
    restaurantId: restaurantDto.restaurantId,
    cart: restaurantDto.cart
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
