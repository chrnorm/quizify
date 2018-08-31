FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN npm install -g -s --no-progress yarn && \
    yarn
# If you are building your code for production
RUN yarn install --production

# Bundle app source
COPY . .

EXPOSE 8888

CMD [ "yarn", "start" ]