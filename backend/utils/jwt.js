let jwt = require('jsonwebtoken');

const jwtIssuer = process.env.APP_URL || 'https://rentomojo.appspot.com';
const jwtSubject = 'JWTAuth';

const jwtOptions = {
  issuer: jwtIssuer,
  subject: jwtSubject,
  expiresIn: '1h',
  notBefore: '300'
};

const jwtSecret = process.env.JWT_SECRET || 'jwtSecret';

module.exports = {
  make: data => jwt.sign(data, jwtSecret, jwtOptions),
  validate: jwtToken => jwt.verify(jwtToken, jwtSecret, jwtOptions)
};
