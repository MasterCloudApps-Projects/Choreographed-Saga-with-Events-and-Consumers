FROM node:16.14.2-alpine3.15  AS builder

WORKDIR /usr/src/app

RUN apk --no-cache add curl
RUN curl -LJO https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
&& chmod +x ./wait-for-it.sh

RUN mkdir -p /usr/src/web
COPY web /usr/src/web
COPY package*.json /usr/src/app/
COPY .npmrc /usr/src/app/
COPY .npmrc /usr/src/web/
COPY .env /usr/src/web

RUN npm ci --only=production
RUN rm -rf .npmrc

WORKDIR /usr/src/web
RUN npm ci
RUN rm -rf .npmrc
RUN npm run build

FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

RUN apk --no-cache add bash coreutils

COPY --from=builder /usr/src/app/ /usr/src/app/
COPY --from=builder /usr/src/web/public /usr/src/app/public
COPY src/ /usr/src/app/src
COPY .env /usr/src/app
COPY server.sh /usr/src/app
EXPOSE 3000

CMD ["./server.sh"]
