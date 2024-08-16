const ShortUrl = require('../model/schema/shortUrl.schema');
const ErrorWithStatus = require('../Exception/error-with-status.exception');
const { nanoid } = require('nanoid');
const QRCode = require('qrcode');
const createShortUrl = async (fullUrl, userId = null, customUrl = null) => {
  let shortUrl;
  if (customUrl) {
    // Check if the custom URL already exists
    const existingUrl = await ShortUrl.findOne({ shortUrl: customUrl });
    if (existingUrl) {
      throw new ErrorWithStatus('Custom URL already in use', 400);
    }
    shortUrl = customUrl;
  } else {
    shortUrl = nanoid(8); // Generate a random URL if no custom URL is provided
  }

  const newShortUrl = new ShortUrl({
    fullUrl,
    shortUrl,
    createdBy: userId,
  });

  await newShortUrl.save();
  return newShortUrl;
};

const redirectShortUrl = async (shortUrl) => {
  const url = await ShortUrl.findOne({ shortUrl });
  if (!url) {
    throw new ErrorWithStatus('URL not found', 404);
  }
  url.clicks += 1;
  await url.save();
  return url;
};

const deleteShortUrl = async (shortUrl, userId) => {
  const url = await ShortUrl.findOne({ shortUrl, createdBy: userId });
  if (!url) {
    throw new ErrorWithStatus('URL not found or unauthorized', 404);
  }
  await ShortUrl.deleteOne({ _id: url._id });
  return url;
};

const generateQrCode = async (shortUrl) => {
  try {
    const url = await ShortUrl.findOne({ shortUrl });
    if (!url) {
      throw new ErrorWithStatus('URL not found', 404);
    }
    const qrCode = await QRCode.toDataURL(
      `${process.env.BASE_URL}/${shortUrl}`
    );
    return qrCode;
  } catch (err) {
    throw new ErrorWithStatus('QR Code generation failed', 500);
  }
};

module.exports = {
  createShortUrl,
  redirectShortUrl,
  deleteShortUrl,
  generateQrCode,
};
