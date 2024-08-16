const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const homeRoute = require('./routes/home.route.js');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const shotenRoute = require('./routes/shorturl.route');

dotenv.config();
const app = express();

//passport config
require('./config/config.passport.js')(passport);

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

//express body parser
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/', shotenRoute);

module.exports = app;
