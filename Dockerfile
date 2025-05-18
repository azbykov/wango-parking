FROM node:18

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm install

COPY . .

RUN npm run build
RUN npm run build:server

CMD ["npm", "run", "start"]
