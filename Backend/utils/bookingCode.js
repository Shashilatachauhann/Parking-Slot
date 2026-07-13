const QRCode = require("qrcode");

const generatePIN = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateQRCode = async (bookingId, pin) => {
  const payload = JSON.stringify({ bookingId, pin });
  const qrDataUrl = await QRCode.toDataURL(payload);
  return qrDataUrl;
};

module.exports = { generatePIN, generateQRCode };