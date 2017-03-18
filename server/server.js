var express = require('express');
var request = require('request');
var cors = require('cors');

var app = express();

app.get('/', cors(), function (req, res) {
  const url = 'https://api.blockcypher.com/v1/btc/main/txs/f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449';
  let responseBody;
  request(url, function (error, response, body) {
    reponseBody = body;
  });
  res.sendStatus(200);
  res.json(responseBody);
});

// app.get('/', function (req, res) {
//   res.sendStatus(200);
// });

app.listen(3001);
