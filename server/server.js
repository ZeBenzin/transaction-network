const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.get('/:address', cors(), (req, res) => {
  const url = `https://api.blockcypher.com/v1/btc/main/txs/${req.params.address}`;
  request(url, (error, response, body) => {
    if (error) {
      res.sendStatus(500);
    }
    const { total, inputs, outputs } = JSON.parse(body);
    const sanitisedData = {
      total,
      inputs,
      outputs
    };
    res.json(sanitisedData);
  });
});

app.listen(3001);
