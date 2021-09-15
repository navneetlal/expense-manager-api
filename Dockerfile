FROM node:14.17-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:14.17-alpine as runtime

WORKDIR /app

RUN mkdir src

COPY --from=build /app/dist /app/src
COPY package.json .
COPY yarn.lock .

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production

EXPOSE 3000
ENV NODE_ENV production

CMD [ "node", "src/server.js" ]
