const express = require('express');
const router = express.Router();

const lang = require('../config/lang');
const auth = require('../utils/auth');
const jwt = require('../utils/jwt');

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.guest);

router.post('/login', (req, res, next) => {
  const username = (req.body.username || '').trim();
  const password = req.body.password || '';

  auth.validateLogin(username, password)
    .then(user => {
      const token = jwt.make(user);

      const data = {
        status: 'success',
        code: lang.messages.success.auth.login.LOGIN_SUCCESS.code,
        message: lang.messages.success.auth.login.LOGIN_SUCCESS.text,
        payload: {
          user: {
            username: user.username
          },
          token
        }
      };

      res.status(200).json(data);
    })
    .catch(() => {
      let data = {
        status: 'failure',
        code: lang.messages.error.auth.login.INVALID_CREDENTIALS.code,
        message: lang.messages.error.auth.login.INVALID_CREDENTIALS.text
      };

      res.status(400).json(data);
    });
});

router.post('/register', (req, res, next) => {
  const username = (req.body.username || '').trim();
  const password = req.body.password || '';

  auth.createAccount(username, password)
    .then(user => {
      const token = jwt.make(user);

      const data = {
        status: 'success',
        code: lang.messages.success.auth.register.REGISTER_SUCCESS.code,
        message: lang.messages.success.auth.register.REGISTER_SUCCESS.text,
        payload: {
          user: {
            username: user.username
          },
          token
        }
      };

      res.status(201).json(data);
    })
    .catch(err => {
      let data = {
        status: 'failure',
        code: lang.messages.error.auth.register.ERROR_UNKNOWN.code,
        message: lang.messages.error.auth.register.ERROR_UNKNOWN.text
      };
      let httpStatusCode = 500;

      if (err.code === lang.messages.error.auth.register.USERNAME_NOT_AVAILABLE.code) {
        data.code = err.code;
        data.message = err.message;

        httpStatusCode = 409;
      }

      res.status(httpStatusCode).json(data);
    });
});

module.exports = router;
