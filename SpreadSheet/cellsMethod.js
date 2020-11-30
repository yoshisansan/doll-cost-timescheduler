
exports.getLastRowNum = async(cells) => ( (cells.length / 5) + 1 );
// exports.getLatestPrice = async() => ();
exports.writeLatestPrice = async (lastRowNum, sheet, scrapedData, Crypto) => {
  const worksheet = await sheet.getWorksheetByName('sheet1');
  const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`),
    BTCcells = await worksheet.getCell(`${Crypto['BTC']}${lastRowNum + 1}`),
    ETHcells = await worksheet.getCell(`${Crypto['ETH']}${lastRowNum + 1}`),
    XRPcells = await worksheet.getCell(`${Crypto['XRP']}${lastRowNum + 1}`),
    LTCcells = await worksheet.getCell(`${Crypto['LTC']}${lastRowNum + 1}`);
  await dataCells.setValue(scrapedData.DATA);
  await BTCcells.setValue(scrapedData.BTC);
  await ETHcells.setValue(scrapedData.ETH);
  await XRPcells.setValue(scrapedData.XRP);
  await LTCcells.setValue(scrapedData.LTC);

  // const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`);
  // const dataCells = await worksheet.getCell(`A${lastRowNum + 1}`);

  // const cells = ( await worksheet.getCells(`A${lastRowNum + 1}:E${lastRowNum + 1}`) );
  // cells.setValue(['aaa', 1, 1, 1, 1]);
  // return cells;
};