// require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    time: req.time
  });
});

app.route('/name').get((req, res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  })
}).post((req, res) => {
  res.json({
    name: `${req.body.first} ${req.body.last}`
  })
})

app.get('/:word/echo', (req, res) => {
  res.json({
    echo: req.params.word
  })
})

app.get('/json', (req, res) => {
  let message = 'Hello json';

  if(process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({
    message
  });
});
































 module.exports = app;
