var global = {};

function fromJSONtoArr (request) {
  console.log(request);
  //ソースがstringifyの２度がけになっているので２回parseしてあげる
  var data = JSON.parse(request.responseText).features;
  var history = JSON.parse(data);
  global = history;
  return history;
  // var test = history.map(d => d.BTC);
}

function getHttpSpreadData () {
var request = new XMLHttpRequest();
request.open('GET', 'https://script.google.com/macros/s/AKfycbw7tjbz9NStCAcRHBHx_WRDKNEqJR2cH7cJANcZ6TRmPmoqGik/exec', true);
request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // console.log("成功")
      return fromJSONtoArr(request);
    } else {
        console.log("error")
        return
    }
};
request.onerror = function() {
    console.log("error")
};
request.send();
}

getHttpSpreadData();