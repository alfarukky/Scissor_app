const { Router } = require('express');
const useController = require('../controller/auth.controller');

const authRoute = Router();

authRoute.post('/register', useController.register);

authRoute.post('/login', useController.login);

authRoute.post('/logout', useController.logout);

module.exports = authRoute;
