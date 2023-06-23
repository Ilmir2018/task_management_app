FROM node:16.16.0 AS development

WORKDIR /ilmir/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:16.16.0 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /ilmir/src/app

COPY --from=development /ilmir/src/app/ .

EXPOSE 3000

CMD [ "node", "dist/main" ]