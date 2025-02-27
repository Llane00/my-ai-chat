# 基本启动命令
在项目根目录下执行以下命令来构建和启动所有服务：
```
docker-compose up
```

首次构建或重新构建
如果您对 Dockerfile 进行了更改，或者是首次运行，建议使用 --build 参数强制重新构建镜像：
```
docker-compose up --build
```

# 查看日志
```
# 查看所有服务的日志
docker-compose logs

# 跟踪日志实时输出
docker-compose logs -f

# 只查看特定服务的日志
docker-compose logs frontend
docker-compose logs backend
```

#停止服务
```
# 停止所有服务但不删除容器
docker-compose stop

# 停止并删除容器、网络等资源
docker-compose down

# 停止并删除容器、网络和镜像
docker-compose down --rmi all
```
