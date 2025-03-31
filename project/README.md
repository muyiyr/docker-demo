# 1. 启动所有服务
docker-compose up --build

# 2. 测试数据插入（新终端执行）
curl -X POST http://localhost:3001/test \
     -H "Content-Type: application/json" \
     -d '{"name":"tes","description":"我是一个test"}'

# 3. 查询数据
curl http://localhost:3001/test

# 4. 检查前端
open http://localhost:8080


[浏览器] --> [前端Nginx:8080]
[前端] --> [后端Node:3000]
[后端] --> [PostgreSQL:5432]