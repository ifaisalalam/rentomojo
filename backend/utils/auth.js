// const firestore = require('./firestore')();

const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

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
          resolve(data);
        })
        .catch(() => {
          reject(false);
        });
    } else reject(false);
  });
};

const createAccount = async (username, password) => {
  const docRef = firestore.collection('users').doc(username);

  return await firestore.runTransaction(t => {
    return t.get(docRef)
      .then(doc => {
        if (doc.exists) {
          const errorCode = lang.messages.error.auth.register.USERNAME_NOT_AVAILABLE.code;
          const errorText = lang.messages.error.auth.register.USERNAME_NOT_AVAILABLE.text;

          const error = new Error(errorText);
          error.code = errorCode;

          throw error;
        }

        const data = {
          username,
          password
        };

        t.set(docRef, data);
        return Promise.resolve(lang.messages.success.auth.register.REGISTER_SUCCESS.code);
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
