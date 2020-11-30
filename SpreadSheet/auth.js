const GoogleSpreadsheetAsPromised = require('google-spreadsheet-as-promised');
const CREDS = require('./express-bitcoin-site.json');
const SHEET_ID = '15a9m3NYDjbCZcrX2JiSz-ZJItiMWFZM5e-l2G_SGQeA';

exports.sheetAuth = async() => {
  console.log('GoogleSpreadSheetへアクセス開始します');
  const sheet = new GoogleSpreadsheetAsPromised();;
  await sheet.load(SHEET_ID, CREDS);
  console.log('auth完了');

  return(sheet);
}
