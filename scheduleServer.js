const { scheduler } = require('./scheduleAction');
const express = require('express'),
  app = express();

app.set("port", process.env.PORT || 5000);

const myLogger = (req, res, next) => {
  console.log('LOGGED')
  next()
}
app.use(myLogger);

app.get('/start-server', (req, res) => {
  (async() => {
    await scheduler();
    res.send('start shceduleAction!!');
    return;
  })().catch(console.log("done"))
})

app.get('*', (req, res) => {
  (async() => {
    res.send('Hello Glitch!');
  })().catch(console.log("done"))
})

app.listen(app.get("port"), ()=>{
  console.log(`Server リスナ:
  ${app.get("port")}監視中`);
})

