FROM node:12-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . ./code

EXPOSE 8000
CMD [ "npm", "run", "dev" ]
