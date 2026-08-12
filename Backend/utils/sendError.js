const sendError = (res, status, publicMessage, error) => {
  if (error) {
    console.error(`${publicMessage}:`, error.message);
  }

  const isProduction = process.env.NODE_ENV === "production";

  const body = { message: publicMessage };
  if (!isProduction && error) {
    body.error = error.message;
  }

  return res.status(status).json(body);
};

module.exports = sendError;
