export class PaymentDone {
  constructor({orderId, receiptId, status}) {
    this.orderId = orderId;
    this.receiptId = receiptId;
    this.status = status;
  }
}
