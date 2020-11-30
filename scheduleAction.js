// node-cronの git https://github.com/node-cron/node-cron
const cron = require('node-cron')
const { getLatestPrice } = require('./schedulePuppeteer');

//毎月1日の0時1分0秒に実行
// cron.schedule('0 1 0 1 * *', () => {
//   console.log('5秒毎に実行します')
// })

exports.scheduler = async() => {
    await cron.schedule('*/50 * * * * *', async () => {
      console.log('50秒毎に実行します');
      const price = await getLatestPrice();
      console.log(price);
    })
}

//例：毎月27日の14時31分0秒に実行します。
// cron.schedule('0 31 14 27 * *', () => {
//   console.log('毎月27日の14時31分0秒に実行します。');
// })