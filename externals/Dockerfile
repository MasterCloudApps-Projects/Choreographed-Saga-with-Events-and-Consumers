FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci --only=production

COPY src/ /usr/src/app/src
EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "src/server.js"]

