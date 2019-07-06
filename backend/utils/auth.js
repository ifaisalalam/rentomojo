const firestore = require('./firestore')();

const lang = require('../config/lang');
const hash = require('./hashing');

const validateLogin = async (username, password) => {
  const docRef = firestore.collection('users').doc(username);
  const doc = await docRef.get();

  return new Promise((resolve, reject) => {
    if (doc.exists) {
      const data = doc.data();
      const hashedPassword = data.password;

      hash.compare(password, hashedPassword)
        .then(() => {
          return resolve(data);
        })
        .catch(() => {
          return reject();
        });
    }

    else return reject();
  });
};

const createAccount = async (username, password) => {
  const docRef = firestore.collection('users').doc(username);

  return await firestore.runTransaction(t => {
    return t.get(docRef)
      .then(async doc => {
        if (doc.exists) {
          const errorCode = lang.messages.error.auth.register.USERNAME_NOT_AVAILABLE.code;
          const errorText = lang.messages.error.auth.register.USERNAME_NOT_AVAILABLE.text;

          const error = new Error(errorText);
          error.code = errorCode;

          throw error;
        }

        const data = {
          username,
          password: await hash.make(password)
        };

        t.set(docRef, data);
        return Promise.resolve(data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  });
};

module.exports = {
  validateLogin,
  createAccount
};
