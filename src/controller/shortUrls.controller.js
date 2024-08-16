const useServices = require('../services/shortUrl.services');
const shotenRequest = async (req, res) => {
  try {
    const { fullUrl, customUrl } = req.body;
    const userId = req.user ? req.user.id : null;
    // Pass the custom URL to the service if provided
    await useServices.createShortUrl(fullUrl, userId, customUrl);
    req.flash('success_msg', 'URL shortened successfully');
    res.redirect('/user');
  } catch (err) {
    req.flash('error_msg', 'Error creating shortened URL: ' + err.message);
    res.redirect('/user');
  }
};

const shotenRedirect = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await useServices.redirectShortUrl(shortUrl);
    res.redirect(url.fullUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    await useServices.deleteShortUrl(shortUrl, req.user.id); // Pass the userId for ownership check
    req.flash('success_msg', 'URL deleted successfully');
    res.redirect('/user');
  } catch (err) {
    req.flash('error_msg', 'Error deleting URL: ' + err.message);
    res.redirect('/user');
  }
};

const getQrCode = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const qrCode = await useServices.generateQrCode(shortUrl);
    res.render('qrcode', { qrCode, shortUrl, layout: false });
  } catch (err) {
    req.flash('error_msg', 'Error generating QR Code: ' + err.message);
    res.redirect('/user');
  }
};

module.exports = { shotenRequest, shotenRedirect, deleteShortUrl, getQrCode };
