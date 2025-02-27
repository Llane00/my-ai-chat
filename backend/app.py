import asyncio
from fastapi import FastAPI, HTTPException
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from pydantic import BaseModel, HttpUrl

app = FastAPI(title="网页爬虫API")

class CrawlResponse(BaseModel):
    markdown: str

@app.get("/crawl", response_model=CrawlResponse)
async def crawl_website(url: HttpUrl, needCache: int = 1):
    """
    爬取指定网址并返回Markdown格式的内容
    
    - url: 要爬取的网页URL
    - needCache: 是否使用缓存，默认为True
    """
    try:
        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(
                url=str(url),
                config=CrawlerRunConfig(
                    cache_mode=CacheMode.BYPASS if needCache == 0 else CacheMode.ENABLED
                )
            )
            return {"markdown": result.markdown}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"爬取失败: {str(e)}")

@app.get("/")
async def root():
    return {"message": "欢迎使用网页爬虫API，请访问 /docs 查看API文档"}

@app.get("/health")
def health():
    return {"status": "ok"} 
