module.exports = function (statusCode, message, body) {
  xdmp.setResponseCode(statusCode, message);
  return body || '';
};
