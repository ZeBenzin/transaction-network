var express = require('express');
var request = require('request');
var cors = require('cors');

var app = express();

app.get('/', cors(), function (req, res) {
  const url = 'https://api.blockcypher.com/v1/btc/main/txs/f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449';
  request(url, function (error, response, body) {
    if (error) {
      res.sendStatus(500);
    }
    res.json(body);
  });
});

app.listen(3001);
