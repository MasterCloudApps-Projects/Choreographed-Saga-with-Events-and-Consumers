import { Router } from 'express';
import DebugLib from 'debug';

import { sendNotification } from "../repositories/notificationsRepository.js";

const debug = new DebugLib('server:sse');

export const routes = Router();

const usersSSE = new Map();

routes.get('/user/:userId', async (req, res) => {
  const userId = req.headers['user-key'];
  debug('user connected', userId);
  usersSSE.set(req.params.userId, res);

  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);

  const data = `SSE Connection established`;
  res.write(data);

  req.on('close', () => {
    console.log(`${userId} Connection closed`);
    usersSSE.delete(userId);
  });
});

export async function sendToUser(userId, message){
  debug('sendToUser', userId, message);
  let res = usersSSE.get(userId);
  if (res) {
    res.write(JSON.stringify(message));
  } else {
    await sendNotification({ ...message, userId});
  }
  return Promise.resolve();
}
