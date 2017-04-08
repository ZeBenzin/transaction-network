var express = require('express');
var request = require('request');
var cors = require('cors');

const app = express();

app.get('/:address', cors(), function (req, res) {
  const url = `https://api.blockcypher.com/v1/btc/main/txs/${req.params.address}`;
  console.log(url);
  request(url, function (error, response, body) {
    if (error) {
      res.sendStatus(500);
    }
    res.json(body);
  });
});

app.listen(3001);
