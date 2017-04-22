const express = require('express');
const request = require('request');
const cors = require('cors');
const _ = require('lodash');

const app = express();

app.get('/:address', cors(), (req, res) => {
  const url = `https://blockchain.info/address/${req.params.address}?format=json`;
  request(url, (error, response, body) => {
    if (error || response.statusCode === 500) {
      res.sendStatus(500);
    } else {
      const transactions = [];
      _.map(JSON.parse(body).txs, ({ result, inputs, out, block_height, hash }) => {
        transactions.push({
          total: result,
          inputs,
          outputs: out,
          block_height,
          hash
        });
      });
      res.send(transactions);
    }
  });
});

app.listen(3001);
