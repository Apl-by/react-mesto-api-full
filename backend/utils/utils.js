const validator = require('validator');

const handleSaftyStr = (data) => Object.fromEntries(
  Object.entries(data).map(([k, v]) => [k, validator.escape(v)]),
);

module.exports = handleSaftyStr;
