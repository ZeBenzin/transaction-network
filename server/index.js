var config = require('./config/config');
var app = require('./server');

app.listen(config.port);

console.log('listening on http://localhost:' + config.port);
