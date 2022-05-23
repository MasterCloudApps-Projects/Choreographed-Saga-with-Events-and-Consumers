import expressWs from 'express-ws';
import DebugLib from 'debug';
import {sendNotification} from "../repositories/notificationsRepository.js";

const debug = new DebugLib('server:ws');

const usersWs = new Map();

export let wsServer;

export function createWsServer(server) {
  const path = '/user/:userId';
  wsServer = expressWs(server).getWss(path);
  server.ws(path, wsRouter);
  debug('ws server connected');
}

function wsRouter(ws, req) {
  debug('user connected', req.params.userId);
  ws.addEventListener('close', () => {
    debug('user disconnected', req.params.userId);
    usersWs.delete(req.params.userId);
  });
  usersWs.set(req.params.userId, ws);
}

export async function sendToUser(userId, message){
  debug('sendToUser', userId, message);
  let ws = usersWs.get(userId);
  if (ws) {
    ws.send(JSON.stringify(message));
  } else {
    await sendNotification({ ...message, userId});
  }
  return Promise.resolve();
}
