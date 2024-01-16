# build stage
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install

COPY . .

RUN npm run build

# production stage
FROM node:18-alpine as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

RUN npm install pm2 -g

COPY ecosystem.config.js .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
