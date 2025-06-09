// translate.js
const fs = require('fs');
const translate = require('google-translate-open-api').default;

(async () => {
  try {
    const readme = fs.readFileSync('README.md', 'utf8');

    const result = await translate(readme, {
      tld: 'cn',
      to: 'zh-CN',
    });

    const translated = result.data[0];
    fs.writeFileSync('README.zh.md', translated, 'utf8');

    console.log('✅ 翻译完成，已生成 README.zh.md');
  } catch (error) {
    console.error('❌ 翻译失败:', error);
    process.exit(1);
  }
})();

