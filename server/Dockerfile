FROM node:16.5-alpine

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server

EXPOSE 4000

CMD ["npm", "start"]