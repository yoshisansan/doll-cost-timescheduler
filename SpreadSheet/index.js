const {sheetAuth} = require('./auth.js')
const {getAllCells} = require('./getCells.js')
const {getLastRowNum, writeLatestPrice} = require('./cellsMethod.js')

const Crypto = {
  'BTC': 'B',
  'ETH': 'C',
  'XRP': 'D',
  'LTC': 'E',
}

// const dammyData = {
//   'DATA': 'Dec, 11, 30',
//   'BTC': 1000000,
//   'ETH': 10000,
//   'XRP': 100,
//   'LTC': 10000,
// }

exports.actionSpreadSheet = async(scrapedData, USDJPY) => {
  const sheet = await sheetAuth(),
    allCells = await getAllCells(sheet),
    cells = await allCells.filter(cell => cell !== ''), //空白セル削除
    lastRowNum = await getLastRowNum(cells);
  await writeLatestPrice(lastRowNum, sheet, scrapedData, USDJPY, Crypto);

  // const latestPrice = await getLatestPrice(lastRowNum, cells);
}

// actionSpreadSheet();