// node-cronの git https://github.com/node-cron/node-cron
const cron = require('node-cron')
const { getLatestPrice } = require('./schedulePuppeteer');
const { actionSpreadSheet } = require('./SpreadSheet/index');
// const SET_TIMER = '*/50 * * * * *'; ////50秒毎
const SET_TIMER = '0 45 18 30 * *'; //毎月30日17時59分
// const SET_TIMER = '0 1 18 30 * *'; ////毎月1日の0時1分0秒に実行

exports.scheduler = async() => {
    await cron.schedule(SET_TIMER, async () => {
      console.log('50秒毎に実行します');
      const [scrapedData, USDJPY] = await getLatestPrice();
      await actionSpreadSheet(scrapedData, USDJPY);
    }, {
      scheduled: true,
      timezone: "Asia/Tokyo"
    })
}