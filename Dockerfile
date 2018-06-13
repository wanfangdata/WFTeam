FROM node:6-alpine

RUN npm config set registry https://registry.npm.taobao.org

# Create app directory
# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

WORKDIR /app/server
COPY package.json package-lock.json ./
RUN npm install

# 先生成依赖层（容量大，且不经常变动），再拷贝程序
WORKDIR /app
COPY . .

RUN npm run build

EXPOSE 8000
CMD [ "npm", "start" ]
