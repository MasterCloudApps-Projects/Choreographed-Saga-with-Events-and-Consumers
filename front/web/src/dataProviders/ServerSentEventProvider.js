export class ServerSentEventProvider extends EventTarget {
  constructor(userKey) {
    super();
    const eventSource = new EventSource(`user/${userKey}`);
    eventSource.addEventListener('open', this.onOpen);
    eventSource.addEventListener('error', this.onError);
    eventSource.addEventListener('message', this.onMessage);
  }

  onMessage(event) {
    console.log(`[message] Data received from server: ${event.data}`);
    this.dispatchEvent(new CustomEvent('updateOrder', {
      detail: JSON.parse(event.data),
      bubbles: true,
      composed: true,
    }));
  };

  onOpen(event) {
    console.log(`[onconnect] event received from server:`, event);
  };

  onError(error) {
    console.log(`[error] ${error.message}`);
  };
}
