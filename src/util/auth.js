const jwt = require("jsonwebtoken");

const verify = (token) => {
  try {
    jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return false;
  }
  return true;
};

const decrypt = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch {
    return;
  }
};

module.exports = { verify, decrypt };
