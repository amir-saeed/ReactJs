const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('../config');
const path = require('path');

// connect to the database and load models
require('./models').connect(config.dbUri);

const app = express();
const clientPath = path.join(__dirname, '../client/');
app.use('/public', express.static(clientPath + 'dist'));
app.use('/orgional', express.static(clientPath + 'src'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});