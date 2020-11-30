const puppeteer = require('puppeteer');
const today = new Date();
const fxUrl = "https://jp.investing.com/currencies/usd-jpy-historical-data";
const targets = [
  {"Crypto": "BTC", "url": "https://coinmarketcap.com/ja/currencies/bitcoin/historical-data/"},
  {"Crypto": "ETH", "url": "https://coinmarketcap.com/ja/currencies/ethereum/historical-data/"},
  {"Crypto": "XRP", "url": "https://coinmarketcap.com/ja/currencies/xrp/historical-data/"},
  {"Crypto": "LTC", "url": "https://coinmarketcap.com/ja/currencies/litecoin/historical-data/"}
]

const OPTION = {
  HEADLESS: true
}

const initializeFunc = async() => {
  const browser = await puppeteer.launch({
    headless: OPTION.HEADLESS,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--incognito', //シークレットモード
    ]
  });

  const page = await browser.newPage();

  //為替サイトの場合、ページが読み込めなくなったため一時保留の処理
  // await page.setRequestInterception(true); // page.on以降の読み込みオプションを有効化
  // page.on('request', (request) => {
  //   if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
  //       request.abort();
  //   } else {
  //       request.continue();
  //   }
  // });

  return [browser, page];
}

const onePagePrice = async(target, page) => {
  await page.goto(target.url, {
    waitUntil:'load',
    timeout:0 // ページが重くtimeoutになるための対策
  });
  await page.evaluate(() => {
    window.scrollTo(0,1700);
  }).catch(()=>'スクロールはエラー');
  // 色々試したところ、jQueryでDOMを取得、取得したDOMから実際の値を得るのはpage.evaluate()が良い。
  const latestLastPriceHandle = await page.$('#__next > div.sc-1mezg3x-0.fHFmDM.cmc-app-wrapper.cmc-app-wrapper--env-prod.cmc-theme--day > div.container.cmc-main-section > div.cmc-main-section__content > div.aiq2zi-0.jvxWIy.cmc-currencies > div.v5fhlm-0.jdAFKL.cmc-details-panel-tabs.col-xs-12 > div > ul.cmc-tabs__body > li.sc-10kr9hg-0.eDLUd.cmc-tab.cmc-tab--selected > div > div > div.sc-1yv6u5n-0.gCAyTd.cmc-table > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > div');
  const latestDateHandle = await page.$('#__next > div.sc-1mezg3x-0.fHFmDM.cmc-app-wrapper.cmc-app-wrapper--env-prod.cmc-theme--day > div.container.cmc-main-section > div.cmc-main-section__content > div.aiq2zi-0.jvxWIy.cmc-currencies > div.v5fhlm-0.jdAFKL.cmc-details-panel-tabs.col-xs-12 > div > ul.cmc-tabs__body > li.sc-10kr9hg-0.eDLUd.cmc-tab.cmc-tab--selected > div > div > div.sc-1yv6u5n-0.gCAyTd.cmc-table > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td.cmc-table__cell.cmc-table__cell--sticky.cmc-table__cell--left > div')
  const latestLastPrice = await page.evaluate(body => body.innerHTML, latestLastPriceHandle);
  const latestDate = await page.evaluate(body => body.innerHTML, latestDateHandle);
  console.log(latestLastPrice, latestDate);

  return { "Crypto": target.Crypto, latestLastPrice, latestData };
}


exports.getLatestPrice = async() => {
  const [browser, page] = await initializeFunc();
  let latestResult = [];

  const getUSDJPY = async() => {
    await page.goto(fxUrl, {
      waitUntil:'load',
      timeout:0 // ページが重くtimeoutになるための対策
    });
    const HandleOfUSDJPY = await page.$('#curr_table > tbody > tr:nth-child(1) > td:nth-child(2)');
    const USDJPY = await page.evaluate(body => Number(body.innerHTML), HandleOfUSDJPY);

    return USDJPY
  }

  const USDJPY = await getUSDJPY();
  console.log('USD/JPY', USDJPY);
  //map関数や関数の切り分けだとpuppetterがエラーとなってできなかったのでfor文で回す
  for(let i = 0; targets.length > i; i++ ){
    await page.goto(targets[i].url, {
      waitUntil:'load',
      timeout:0 // ページが重くtimeoutになるための対策
    });
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      window.scrollTo(0,1700);
    }).catch(()=>'スクロールはエラー');
    // 色々試したところ、jQueryでDOMを取得、取得したDOMから実際の値を得るのはpage.evaluate()が良い。
    const latestLastPriceHandle = await page.$('#__next > div.sc-1mezg3x-0.fHFmDM.cmc-app-wrapper.cmc-app-wrapper--env-prod.cmc-theme--day > div.container.cmc-main-section > div.cmc-main-section__content > div.aiq2zi-0.jvxWIy.cmc-currencies > div.v5fhlm-0.jdAFKL.cmc-details-panel-tabs.col-xs-12 > div > ul.cmc-tabs__body > li.sc-10kr9hg-0.eDLUd.cmc-tab.cmc-tab--selected > div > div > div.sc-1yv6u5n-0.gCAyTd.cmc-table > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > div');
    const latestDateHandle = await page.$('#__next > div.sc-1mezg3x-0.fHFmDM.cmc-app-wrapper.cmc-app-wrapper--env-prod.cmc-theme--day > div.container.cmc-main-section > div.cmc-main-section__content > div.aiq2zi-0.jvxWIy.cmc-currencies > div.v5fhlm-0.jdAFKL.cmc-details-panel-tabs.col-xs-12 > div > ul.cmc-tabs__body > li.sc-10kr9hg-0.eDLUd.cmc-tab.cmc-tab--selected > div > div > div.sc-1yv6u5n-0.gCAyTd.cmc-table > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td.cmc-table__cell.cmc-table__cell--sticky.cmc-table__cell--left > div')
    const latestLastPrice = await page.evaluate(body => body.innerHTML.replace(/,/g, ""), latestLastPriceHandle);
    const latestDate = await page.evaluate(body => body.innerHTML.replace(/,/g, ""), latestDateHandle);
    latestResult.push( { "Crypto": targets[i].Crypto, latestLastPrice, latestDate } );
  }
  browser.close();

  return [latestResult, USDJPY];
}
// getLatestPrice();