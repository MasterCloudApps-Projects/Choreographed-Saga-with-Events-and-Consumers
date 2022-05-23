import bodyParser from "body-parser";
import express from "express";
import { notificationsRoutes } from "./notificationsRouter.js";

const {API_REST_PORT} = process.env;

const server = express();
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(express.json());
  server.use('/', notificationsRoutes);

server.listen(API_REST_PORT, () => console.log(`Server listening on port ${API_REST_PORT}!`));
