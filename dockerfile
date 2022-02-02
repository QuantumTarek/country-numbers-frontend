FROM node:16.13.2-alpine3.15

COPY package.json ./

RUN npm install

COPY . /app

WORKDIR /app

EXPOSE 3000

CMD npm start