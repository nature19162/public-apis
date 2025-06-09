import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 在 GitHub Actions 中设置这个变量
});

async function translateText(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "你是一个翻译助手，请将以下英文文本翻译成简体中文，保留格式、Markdown和代码块。" },
      { role: "user", content: text }
    ]
  });

  return completion.choices[0].message.content;
}

async function main() {
  const readmePath = path.resolve('./README.md');
  const zhPath = path.resolve('./README.zh.md');
  const content = fs.readFileSync(readmePath, 'utf8');

  const translated = await translateText(content);
  fs.writeFileSync(zhPath, translated, 'utf8');
  console.log('翻译完成！README.zh.md 已生成');
}

main().catch(console.error);
