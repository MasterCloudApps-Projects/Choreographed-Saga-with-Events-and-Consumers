import {Router} from 'express';
import DebugLib from 'debug';
import uniqid from 'uniqid';

const debug = new DebugLib('server:rest:payment');

export const notificationsRoutes = Router();

const notificationsType = ['email', 'sms', 'push']

const notificationsSent = [{status: "notifications service running"}];


notificationsRoutes.get('/api/notifications/:id', async (req, res) => {
  const body = notificationsSent.find(elem => elem.userId?.endsWith(req.params.id));
  if (body) {
    return res.status(200).json(body);
  }
  return res.status(404).json({});
});

notificationsRoutes.get('/api/notifications', async (req, res) => {
  res.set('Content-Type', 'text/html');
  let body = '<h1>Notifications sent</h1>';
  body = notificationsSent.reduce((result, notification) => `${result}<li>${JSON.stringify(notification)}</li>`, body) + '</ul>';
  res.send(Buffer.from(body));
});

notificationsRoutes.post('/api/notifications', async (req, res) => {
  debug('post request', req.body);
  notificationsType.sort(() => 1 - Math.random()*2)
  const body = {...req.body, notificationId: uniqid(), notificationType: notificationsType[0]};
  notificationsSent.push(body);
  debug('post response', body);
  return res.status(201).json(body);
});
