```
# 安装依赖
pip3 install crawl4ai --pre
python3 -m playwright install --with-deps chromium
pip3 install fastapi uvicorn
```

```
# 启动应用
uvicorn app:app --reload
```

```
# 访问应用
http://127.0.0.1:8000/crawl?url=https://www.nbcnews.com/business

curl -X GET "http://127.0.0.1:8000/crawl?url=https://www.nbcnews.com/business"
```
