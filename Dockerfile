FROM node:10

WORKDIR /usr/share/wechatapp

COPY package*.json ./

RUN npm install

COPY . . 



CMD [ "npm", "start" ]