const { Router } = require('express');
const useController = require('../controller/shortUrls.controller');
const { ensureAuthenticated } = require('../middleware/auth.middleware');
const shotenRoute = Router();

shotenRoute.post('/shortUrl', ensureAuthenticated, useController.shotenRequest);

shotenRoute.get('/:shortUrl', useController.shotenRedirect);

shotenRoute.post(
  '/shortUrl/:shortUrl/delete',
  ensureAuthenticated,
  useController.deleteShortUrl
);

shotenRoute.get(
  '/shortUrl/:shortUrl/qrcode',
  ensureAuthenticated,
  useController.getQrCode
);

module.exports = shotenRoute;
