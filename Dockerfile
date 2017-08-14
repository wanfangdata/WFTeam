FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

# RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /usr/src/app
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/server
RUN npm install

EXPOSE 8000
CMD [ "npm", "start" ]
