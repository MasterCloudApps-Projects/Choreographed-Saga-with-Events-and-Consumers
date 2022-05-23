export class OrderCompleted {
  constructor(orderEntity) {
    this.orderId = orderEntity.orderId;
    this.userId = orderEntity.userId;
    this.restaurantId = orderEntity.restaurantId;
    this.riderId = orderEntity.riderId;
    this.receiptId = orderEntity.receiptId;
    this.cart = orderEntity.cart.map(cartLine => ({
        itemId: cartLine.itemId,
        amount: cartLine.amount,
      })
    );
    this.price = orderEntity.price;
    this.status = orderEntity.status;
  }
}
