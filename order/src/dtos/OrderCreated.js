export class OrderCreated {
  constructor(orderEntity) {
    this.orderId = orderEntity._id.toString();
    this.userId = orderEntity.userId;
    this.cart = orderEntity.cart.map(cartLine => ({
        itemId: cartLine.itemId,
        amount: cartLine.amount,
      })
    );
    this.status = orderEntity.status;
  }
}
