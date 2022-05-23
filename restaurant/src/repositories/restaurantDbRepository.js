import createDebug from 'debug';
import {RestaurantEntity, STATUS_CANCELLED, STATUS_CREATED} from "../models/restaurantEntity.js";

const debug = createDebug('mongo:restaurant:repository');

export async function findRestaurant(orderId) {
  return await RestaurantEntity.findOne({orderId});
}

export async function saveRestaurant(request) {
  return request.state === STATUS_CREATED ? await saveCreatedRestaurant(request) : await saveCancelledRestaurant(request);
}

async function saveCreatedRestaurant(request) {
  const restaurantEntity = new RestaurantEntity(request);
  debug('to save', request, restaurantEntity);
  await restaurantEntity.save();
  return restaurantEntity;
}

async function saveCancelledRestaurant(request) {
  const restaurantEntity = new RestaurantEntity(request);
  debug('to save', request, restaurantEntity);
  await restaurantEntity.save();
  return restaurantEntity;
}

export async function cancelRestaurant(orderId) {
  return await RestaurantEntity.findOneAndUpdate({orderId}, {status: STATUS_CANCELLED});
}
