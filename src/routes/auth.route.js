const { Router } = require('express');
const useController = require('../controller/auth.controller');
const generateMiddleWare = require('../middleware/route.middleware');
const {
  registerSchema,
  loginSchema,
} = require('../validation/auth.validation');
const authRoute = Router();

authRoute.post(
  '/register',
  generateMiddleWare(registerSchema),
  useController.register
);

authRoute.post('/login', generateMiddleWare(loginSchema), useController.login);

authRoute.post('/logout', useController.logout);

module.exports = authRoute;
