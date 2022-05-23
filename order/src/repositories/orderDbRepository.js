import createDebug from 'debug';
import {OrderEntity, STATUS_CANCELLED, STATUS_COMPLETED} from "../models/OrderEntity.js";
import {OrderCreated} from "../dtos/OrderCreated.js";

const debug = createDebug('mongo:order:repository');

export async function saveOrder(order) {
  const orderEntity = new OrderEntity(order);
  await orderEntity.save();
  const dto = new OrderCreated(orderEntity);
  debug('saved', dto);
  return dto;
}

export async function updateOrder(orderDto) {
  const orderEntity = await OrderEntity.findByIdAndUpdate(orderDto.orderId, orderDto);
  if (orderEntity.status !== STATUS_CANCELLED && orderEntity.restaurantId && orderEntity.riderId && orderEntity.restaurantId) {
    orderEntity.status = STATUS_COMPLETED;
    orderEntity.save();
  }
  const dto = new OrderCreated(orderEntity);
  debug('saved', dto);
  return dto;
}

export async function cancelOrder({orderId, status}) {
  await OrderEntity.findByIdAndUpdate(orderId, {status});
}
