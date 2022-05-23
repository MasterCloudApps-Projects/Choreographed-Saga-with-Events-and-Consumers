import {createKafkaConnection} from "./connections/kafkaConnection.js";
import {createExpressServer} from './connections/restConnection.js';
import {createPublicServer} from "./connections/publicConnection.js";
import {createWsServer} from './connections/wsConnection.js';

const {API_REST_PORT, FRONT_CONNECTION_TYPE} = process.env;

await createKafkaConnection();
const server = createExpressServer();
createPublicServer(server)
if (FRONT_CONNECTION_TYPE === 'WS') {
  createWsServer(server);
}

server.listen(API_REST_PORT, () => console.log(`Server listening on port ${API_REST_PORT}!`));
