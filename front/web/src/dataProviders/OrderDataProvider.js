export class OrderDataProvider {
  constructor(userKey) {
    this.userKey = userKey;
  }
  async createOrder(restaurantId, cart) {
    let response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'user-key': this.userKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({restaurantId, cart}),
    });
    return await response.json();
  }
}
