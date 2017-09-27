var express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let winston = require('winston');
let mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./config/'+ process.env.NODE_ENV + '.json'); // pass all config option by env variable

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

mongoose.Promise = global.Promise;
mongoose.connect(config.database,options);

app.use(cors());

app.use(bodyParser.json());

let  api = require('./routes/api');
app.get('/api', function (req, res) {
  res.json({ 'apiversion': 'v1' });
});
app.use('/api/v1', api);


let server = app.listen(config.nodePort, ()=> {
  console.log(config);
  winston.log('App Started on PORT' + config.nodePort );
});

module.exports = {
  app,
  server
};
