const bcrypt = require('bcrypt');
const saltRounds = 10;

const make = async password => {
  const token = await bcrypt.hashSync(password, saltRounds);
  return Promise.resolve(token);
};

const compare = async (plainTextPassword, hash) => {
  const passwordMatched = await bcrypt.compareSync(plainTextPassword, hash);

  if (passwordMatched) {
    return Promise.resolve(passwordMatched);
  }

  return Promise.reject(passwordMatched);
};

module.exports = {
  make,
  compare
};
