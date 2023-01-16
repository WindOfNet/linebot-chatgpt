# linebot-chatgpt

## 準備
https://developers.line.biz/console/  
create 一個 provider, messaging api channel  
取得 Channel secret 與 messaging api 的 Channel access token  
設定 關閉自動回應、webhook 啟用 (hook url 需要 https 連入)

https://beta.openai.com/account/api-keys  
申請 openai API key

## env
```
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
OPENAI_API_KEY=
```
