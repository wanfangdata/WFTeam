# 构建阶段
FROM node:alpine as build-env

WORKDIR /src

# 先生成依赖层（容量大，且不经常变动），再拷贝程序
COPY package.json package-lock.json ./
RUN npm install --registry=http://registry.npm.taobao.org

COPY . .
RUN npm run build

# 发布阶段
FROM node:alpine

WORKDIR /app
COPY --from=build-env /src/server/package.json /src/server/package-lock.json ./
RUN npm install --registry=http://registry.npm.taobao.org && npm cache clean --force

COPY --from=build-env /src/server .

EXPOSE 8000
CMD [ "npm", "start" ]
