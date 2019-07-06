const jwt = require('../utils/jwt');
const lang = require('../config/lang');

module.exports = {
  guest: (req, res, next) => {
    const jwtToken = req.token || '';

    try {
      const _ = jwt.validate(jwtToken);

      return res.status(403).json({
        status: 'error',
        code: lang.messages.error.guest.required.NOT_AUTHORIZED.code,
        message: lang.messages.error.guest.required.NOT_AUTHORIZED.text
      });
    } catch (error) {
      next();
    }
  },
  user: (req, res, next) => {
    const jwtToken = req.token || '';

    try {
      req.payload = jwt.validate(jwtToken);
      req.authenticated = true;

      next();
    } catch (error) {
      req.authenticated = false;

      return res.status(401).json({
        status: 'error',
        code: lang.messages.error.auth.required.NOT_AUTHENTICATED.code,
        message: lang.messages.error.auth.required.NOT_AUTHENTICATED.text
      });
    }
  }
};
