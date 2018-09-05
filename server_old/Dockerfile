FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

# Bundle app source
COPY . .

EXPOSE 8888

CMD [ "yarn", "run", "start-prod" ]