# 构建阶段
FROM node:6-alpine as build-env

RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /src

# 先生成依赖层（容量大，且不经常变动），再拷贝程序
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# 发布阶段
FROM node:6-alpine

RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /app
COPY --from=build-env /src/server/package.json /src/server/package-lock.json ./
RUN npm install && npm cache clean

COPY --from=build-env /src/server .

EXPOSE 8000
CMD [ "npm", "start" ]
