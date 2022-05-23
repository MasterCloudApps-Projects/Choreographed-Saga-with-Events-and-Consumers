export class CreateOrderDto {
  constructor(data, userId) {
    this.userId = userId;
    this.restaurantId = data.restaurantId;
    this.cart = data.cart.map(cartLine => ({
        itemId: cartLine.itemId,
        amount: cartLine.amount,
      })
    );
  }
}
