import bodyParser from "body-parser";
import express from "express";
import { configRoutes } from "./configRouter.js";
import {restaurantRoutes} from "./restaurantRouter.js";
import {riderRoutes} from "./riderRouter.js";
import {paymentRoutes} from "./paymentRouter.js";

const {API_REST_PORT} = process.env;

const server = express();
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(express.json());
  server.use('/', configRoutes);
  server.use('/', restaurantRoutes);
  server.use('/', riderRoutes);
  server.use('/', paymentRoutes);

server.listen(API_REST_PORT, () => console.log(`Server listening on port ${API_REST_PORT}!`));
