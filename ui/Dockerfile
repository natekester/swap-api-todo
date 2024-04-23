FROM node:20-alpine as base
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

FROM base as dev-server
CMD ["yarn", "start-dev"]

FROM base as prod-server
CMD ["yarn", "start"]