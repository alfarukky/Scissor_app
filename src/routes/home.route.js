const { Router } = require('express');
const { forwardAuthenticated } = require('../middleware/auth.middleware');
const homeRoute = Router();

homeRoute.get('/', forwardAuthenticated, (req, res) => {
  res.render('index');
});

module.exports = homeRoute;
