const fs = require("fs");
const { default: translate } = require("google-translate-open-api");

async function run() {
  const input = fs.readFileSync("README.md", "utf8");

  const result = await translate(input, {
    tld: "cn",
    to: "zh-CN",
  });

  const translated = result.data[0];
  fs.writeFileSync("README.zh.md", translated);
  console.log("README 已翻译为中文并保存为 README.zh.md");
}

run().catch((err) => {
  console.error("翻译失败：", err);
  process.exit(1);
});
