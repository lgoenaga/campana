FROM node:18-buster

WORKDIR ~/app/dev/informationstorage

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
