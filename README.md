# WFTeam

> A assistant for wanfang team

## 开发

``` bash
# web
cd WFTeam

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev 
```
``` bash
# 设置MongoDB环境变量
set MONGODB_CONNECTION=127.0.0.1:27017/wfteam

# server
cd server

# install dependencies
npm install

# serve with hot reload at localhost:8000
npm start
```

## 构建&部署

``` bash
# build
cd WFTeam
docker build -f Dockerfile -t wfteam:latest .

# deploy & run
docker run --name wfteam -p 8000:8000 -e "MONGODB_CONNECTION=127.0.0.1:27017/wfteam" -d wfteam:latest
docker start wfteam

```

## 其他

建议使用淘宝NPM源：
``` bash
npm config set registry https://registry.npm.taobao.org
```
