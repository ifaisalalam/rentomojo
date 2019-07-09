const firestore = require('./firestore')();

const lang = require('../config/lang');
const hash = require('./hashing');

const validateLogin = async (username, password) => {
  const docRef = firestore.collection('users').doc(username);
  const doc = await docRef.get();

  return new Promise((resolve, reject) => {
    if (doc.exists) {
      const user = {
        username: doc.id,
        data: doc.data(),
        createTime: doc.createTime,
        updateTime: doc.updateTime
      };
      const hashedPassword = user.data.password;

      hash.compare(password, hashedPassword)
        .then(() => {
          return resolve(user);
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

        t.create(docRef, data);

        return Promise.resolve({
          username,
          data,
        });
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
  });
};

module.exports = {
  validateLogin,
  createAccount
};
