### **构建与运行**

#### **1. 构建镜像**

```bash
docker build -t my-node-app .
```



#### **2. 运行容器**

```bash
docker run -d -p 3005:3000 my-node-app
```



#### **3. 测试服务**

* 打开浏览器或使用 `curl` 测试：

  ```bash
  curl http://localhost:3005
  ```

* 结果：

  ```plain&#x20;text
  Hello, Docker!
  ```
