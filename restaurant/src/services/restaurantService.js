import createDebug from 'debug';
import {
  publishMessageRestaurantCancelled,
  publishMessageRestaurantReserved
} from '../repositories/restaurantEventRepository.js'
import {cancelRestaurant, findRestaurant, saveRestaurant,} from '../repositories/restaurantDbRepository.js';
import {externalRestaurant} from "../repositories/externalRepository.js";
import {STATUS_CREATED} from '../models/restaurantEntity.js';
import {RestaurantReserved} from "../dtos/RestaurantReserved.js";
import {RestaurantCancelled} from "../dtos/RestaurantCancelled.js";

const debug = createDebug('service:restaurant');

async function createAndSaveRestaurant(restaurantDto) {
  const restaurantToSave = await externalRestaurant(restaurantDto);
  return await saveRestaurant(restaurantToSave);
}

export async function save(restaurantDto, correlationId) {
  debug('save', restaurantDto, correlationId);
  const restaurantReserved = await findRestaurant(restaurantDto.orderId) || await createAndSaveRestaurant(restaurantDto);
  debug('actual', restaurantReserved);
  return restaurantReserved.status === STATUS_CREATED ?
    await publishMessageRestaurantReserved(JSON.stringify(new RestaurantReserved(restaurantReserved)), correlationId) :
    await publishMessageRestaurantCancelled(JSON.stringify(new RestaurantCancelled(restaurantReserved)), correlationId);
}

export async function compensate({orderId}) {
  return await cancelRestaurant(orderId);
}
