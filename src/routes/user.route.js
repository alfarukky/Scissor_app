const ShortUrl = require('../model/schema/shortUrl.schema');
const { Router } = require('express');
const { ensureAuthenticated } = require('../middleware/auth.middleware');
const userRoute = Router();

userRoute.get('/', ensureAuthenticated, async (req, res) => {
  const shortUrls = await ShortUrl.find({ createdBy: req.user._id });
  res.render('url-shortner', { shortUrls, user: req.user });
});

module.exports = userRoute;
