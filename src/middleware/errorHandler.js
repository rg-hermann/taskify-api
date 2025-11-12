// simple express error handler
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  // if headers already sent, delegate
  if (res.headersSent) {
    return next(err);
  }

  res.status(status).json(payload);
}

module.exports = { errorHandler };
