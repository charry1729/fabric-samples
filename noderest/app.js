const express = require('express');

const app = express();
const basicAuth = require('express-basic-auth');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const companyRoutes = require('./api/routes/company');
const notaryRoutes = require('./api/routes/notary');

app.use(morgan('dev'));

// app.use(basicAuth({
//     users: { 'admin': 'supersecret' }
// }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  if (req.method === 'options') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/company', companyRoutes);
app.use('/notary', notaryRoutes);

app.use((req, res, next) => {
  res.status(200).json({
    message: 'It Works!',
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
