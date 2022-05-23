export class PaymentCancelled {
  constructor({orderId, paymentCancellationReason, status}) {
    this.orderId = orderId;
    this.paymentCancellationReason = paymentCancellationReason || 'generic error';
    this.status = status;
  }
}
