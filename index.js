const express = require("express");
const line = require("@line/bot-sdk");
const openai = require("openai");
require("dotenv").config();

const lineClient = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

const openaiClient = new openai.OpenAIApi(
  new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

const app = express();

app.post("/", line.middleware(lineClient.config), async (req, res) => {
  try {
    const result = await Promise.all(req.body.events.map(handleEvent));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const completion = await openaiClient.createCompletion({
    model: "text-davinci-003",
    prompt: event.message.text,
    temperature: 0.5,
    max_tokens: 200,
  });

  return lineClient.replyMessage(event.replyToken, {
    type: "text",
    text: completion.data.choices[0].text,
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
