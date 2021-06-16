function handleError(err, message, res) {
  res.json({
    error: err,
    message: message,
  });
}

module.exports = {
  handleError: handleError,
};
