const fs = require('fs');
const translate = require('google-translate-open-api').default;

(async () => {
  const readme = fs.readFileSync('README.md', 'utf8');
  const result = await translate(readme, {
    tld: 'cn',
    to: 'zh-CN',
  });

  const translated = result.data[0];
  fs.writeFileSync('README.zh.md', translated);
})();
