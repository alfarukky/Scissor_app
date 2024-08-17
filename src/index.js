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
const limiter = require('./middleware/limiter.middleware');
const errorMiddleware = require('./middleware/error.middleware');

dotenv.config();
const app = express();

//passport config
require('./utils/utils.passport.js')(passport);

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

//rate limiting implemented.
app.use(limiter);

app.use(errorMiddleware);

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/', shotenRoute);

//catch all route
app.all('*', (req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;
