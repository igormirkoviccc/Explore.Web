FROM node:12-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY package.json .
RUN npm install

COPY . ./code

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
