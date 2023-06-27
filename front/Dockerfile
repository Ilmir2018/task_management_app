FROM node:16.16.0 AS development

WORKDIR /ilmir/front/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 4200