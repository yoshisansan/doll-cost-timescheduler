
exports.getLastRowNum = async(cells) => ( (cells.length / 5) + 1 );
// exports.getLatestPrice = async() => ();
exports.writeLatestPrice = async (lastRowNum, sheet, scrapedData, USDJPY, Crypto) => {
  const worksheet = await sheet.getWorksheetByName('cryptoHistory');
  const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`),
    BTCcells = await worksheet.getCell(`${Crypto['BTC']}${lastRowNum + 1}`),
    ETHcells = await worksheet.getCell(`${Crypto['ETH']}${lastRowNum + 1}`),
    XRPcells = await worksheet.getCell(`${Crypto['XRP']}${lastRowNum + 1}`),
    LTCcells = await worksheet.getCell(`${Crypto['LTC']}${lastRowNum + 1}`);
  const BTCprice = scrapedData[0].latestLastPrice * USDJPY,
    ETHprice = scrapedData[1].latestLastPrice * USDJPY,
    XRPprice = scrapedData[2].latestLastPrice * USDJPY,
    LTCprice = scrapedData[3].latestLastPrice * USDJPY;
  await dataCells.setValue(scrapedData[0].latestDate);
  await BTCcells.setValue(BTCprice);
  await ETHcells.setValue(ETHprice);
  await XRPcells.setValue(XRPprice);
  await LTCcells.setValue(LTCprice);

  // const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`);
  // const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`);

  // const cells = ( await worksheet.getCells(`A${lastRowNum + 1}:E${lastRowNum + 1}`) );
  // cells.setValue(['aaa', 1, 1, 1, 1]);
  // return cells;
};