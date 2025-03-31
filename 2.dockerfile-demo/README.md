# Docker 构建与运行

## 镜像构建
进入含 `Dockerfile` 的目录，执行：
```bash
docker build -t dockerfile-demo .
```
- `-t`：指定镜像名 `dockerfile-demo`（和标签）
- `.`：用当前目录的 `Dockerfile` 构建

## 容器运行
构建完成后，执行：
```bash
docker run --name dockerfile-demo-server -d -p 8098:80 dockerfile-demo
```
- `--name`：指定容器名 `dockerfile-demo-server`
- `-d`：后台运行
- `-p`：端口映射（宿主机 8098 到容器 80）
- `dockerfile-demo`：使用的镜像名 