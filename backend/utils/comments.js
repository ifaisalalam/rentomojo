const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

const collection = 'comments';

const fetchComments = async () => {
  const snapshot = await firestore.collection(collection).get();
  return snapshot.docs.map(doc => doc.data());
};

const addComment = async (user, comment) => {
  return await firestore.collection(collection).add({
    user,
    comment,
    votes: 0
  });
};

module.exports = {
  fetchComments,
  addComment
};
