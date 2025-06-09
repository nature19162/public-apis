const fs = require('fs');
const translate = require('google-translate-open-api').default;

async function translateReadme() {
  const text = fs.readFileSync('README.md', 'utf-8');
  const result = await translate(text, {
    tld: "cn",
    to: 'zh-CN',
  });

  fs.writeFileSync('README.zh.md', result.data[0], 'utf-8');
  console.log('✅ README 已翻译为中文');
}

translateReadme().catch(err => {
  console.error('❌ 翻译失败:', err);
  process.exit(1);
});
