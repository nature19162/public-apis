import { readFileSync, writeFileSync } from 'fs';
import OpenAI from 'openai';

async function main() {
  const openai = new OpenAI();

  // 读取英文 README
  const text = readFileSync('README.md', 'utf8');

  // 调用 ChatGPT 翻译
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "你是一个专业的英文到中文翻译助手。" },
      { role: "user", content: `请将以下英文文档翻译成流畅、自然的中文：\n\n${text}` }
    ],
    temperature: 0.3,
  });

  const zhText = response.choices[0].message.content;

  // 写入中文 README
  writeFileSync('README.zh.md', zhText);

  console.log('翻译完成，已生成 README.zh.md');
}

main();
