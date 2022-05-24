FROM node:12.18.1

WORKDIR /app

RUN apt-get update

COPY package.json ./

# Install dependencies
RUN npm install -g typescript
RUN npm i
# Copy project files into the /app directory
COPY . .
# Post-install command for SC
RUN npm run compile

# Run server in dev mode
CMD ["npm", "run", "start-dev"]
