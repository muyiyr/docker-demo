FROM bitnami/node

# 设置工作目录
WORKDIR /application

COPY . .

RUN npm install

# 暴露服务端口
EXPOSE 3000

CMD ["node", "server.js"]
