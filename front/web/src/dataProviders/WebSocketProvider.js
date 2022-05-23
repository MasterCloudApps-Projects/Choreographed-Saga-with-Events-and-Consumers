export class WebSocketProvider extends EventTarget {
  constructor(userKey) {
    super();
    const ws = new WebSocket(`ws://${window.location.host}/user/${userKey}`);
    ws.addEventListener('open', this.onOpen);
    ws.addEventListener('close', this.onClose);
    ws.addEventListener('error', this.onError);
    ws.addEventListener('message', this.onMessage.bind(this));
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

  onClose(event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log('[close] Connection died');
    }
  };

  onError(error) {
    console.log(`[error] ${error.message}`);
  };
}
