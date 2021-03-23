# An ARG declared before the FROM instruction cannot be used after the FROM
ARG TAG
FROM node:$TAG

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

USER node

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]

# docker build -t sabesp-morungaba-be .
# Windows: docker run --name sabesp-morungaba-be sabesp-morungaba-be
# Linux: docker run --name sabesp-morungaba-be sabesp-morungaba-be
