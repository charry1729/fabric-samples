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


(swaggerJsdoc = require('swagger-jsdoc')),
  (swaggerUi = require('swagger-ui-express'));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      swagger: '2.0',
      title: 'NFT Asset Transfer Express API with Swagger',
      description:
        'This is a simple NFT APIs application made with Express and documented with Swagger',
      // license: {
      //   name: 'MIT',
      //   url: 'https://spdx.org/licenses/MIT.html',
      // },
      // contact: {
      //   name: 'LogRocket',
      //   url: 'https://logrocket.com',
      //   email: 'info@email.com',
      // },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Staging server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js', './api/routes/*.js'],
};

const specs = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    // customCssUrl:
    //   'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
  })
);

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
