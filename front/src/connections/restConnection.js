import bodyParser from "body-parser";
import express from "express";
import {routes as b4fRouter} from "../routes/b4fRouter.js";
import {routes as sseRouter} from "../routes/sseRouter.js";

const {FRONT_CONNECTION_TYPE} = process.env;

export function createExpressServer() {
  const server = express();
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(express.json());
  server.use('/api', b4fRouter);
  if (FRONT_CONNECTION_TYPE === 'SSE') {
    server.use('/', sseRouter);
  }
  return server;
}
