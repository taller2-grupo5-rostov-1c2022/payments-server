FROM node:12.18.1

WORKDIR /app

RUN apt-get update

COPY package.json ./

RUN npm install -g typescript
RUN npm i
COPY . .
# Postinstall command for SC
RUN npm run compile

CMD ["npm", "run", "start"]
