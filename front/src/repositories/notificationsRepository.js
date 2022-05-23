import got from 'got';
import DebugLib from 'debug';

const debug = new DebugLib('server:notifications:repository');
const {NOTIFICATIONS_URL} = process.env;

export async function sendNotification (request) {
  debug('notifications request', request)
  if (request.reason || request.receiptId) { //ensure order is finished or cancelled
    const options = {
      json: request,
      throwHttpErrors: false
    };
    const {body, statusCode} = await got.post(NOTIFICATIONS_URL, options);
    debug('notifications response', statusCode, body);
    return JSON.parse(body);
  } else {
    debug('notifications ignored because order is not ended')
  }
}
