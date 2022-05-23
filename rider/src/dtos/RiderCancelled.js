export class RiderCancelled {
  constructor({orderId, riderCancellationReason, riderId, status}) {
    this.orderId = orderId;
    this.riderId = riderId;
    this.riderCancellationReason = riderCancellationReason || 'generic error';
    this.status = status;
  }
}
