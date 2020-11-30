exports.getAllCells = async(sheet) => {
  const worksheet = await sheet.getWorksheetByName('cryptoHistory');
  //セルの範囲は2020年以降の10年分まで先に指定しておく（10年経過する前に範囲を拡張しておく必要があります。）
  const cells = ( await worksheet.getCells('A2:E200') ).getAllValues();
  return cells;
}