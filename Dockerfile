FROM node:12 as builder

WORKDIR /app

# 将项目添加到 docker容器中
COPY build ./build
COPY public ./public
COPY src ./src

COPY .env.production .env
COPY babel.config.js .
COPY jest.config.js .
COPY postcss.config.js .
COPY vue.config.js .
COPY default.conf .
COPY package.json .

RUN npm install --verbose --no-shrinkwrap --no-lockfile --registry=https://registry.npm.taobao.org
RUN npm run build:prod

FROM nginx:1.20.0

COPY --from=builder /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

EXPOSE 80
