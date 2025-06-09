// translate.js
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// 初始化 OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 读取 README.md 内容
const readmePath = path.resolve(__dirname, 'README.md');
const content = fs.readFileSync(readmePath, 'utf-8');

// 将内容按段落拆分，防止请求过大
const segments = content.split('\n\n').filter(Boolean);

// 翻译函数
async function translateText(text) {
  const prompt = `请将以下内容翻译为简体中文：\n\n${text}`;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message.content.trim();
}

// 执行翻译流程
(async () => {
  let translated = '';
  for (const segment of segments) {
    console.log('正在翻译一段内容...');
    try {
      const result = await translateText(segment);
      translated += result + '\n\n';
    } catch (err) {
      console.error('翻译失败：', err.message);
      translated += '[翻译失败的段落略过]\n\n';
    }
  }

  // 写入翻译后的文件
  const outputPath = path.resolve(__dirname, 'README.zh.md');
  fs.writeFileSync(outputPath, translated, 'utf-8');
  console.log('翻译完成，已保存为 README.zh.md');
})();
