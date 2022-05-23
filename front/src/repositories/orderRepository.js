import got from 'got';
import DebugLib from 'debug';

const debug = new DebugLib('server:order:repository');
const {ORDER_URL} = process.env;

export async function sendCreateOrder (request, userId) {
  const options = {
    headers: {
      'user-key': userId,
    },
    json: request,
    throwHttpErrors: false
  };
  const {body, statusCode} = await got.post(ORDER_URL, options);
  debug('order response', statusCode, body);
  return JSON.parse(body);
}
