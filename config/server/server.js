const express = require('express');
const cronTask = require('../../cron/products/cron');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('Back copy app');
  res.end();
});

app.all('/server.js', (req, res) => {
  res.write('Back copy server.js');
  cronTask.backCopy90();
  res.end();
  console.log('cron task is running: Delete/Add');
});

app.listen(PORT, () => {
  console.log(`The app is running on ${PORT}`);
});
