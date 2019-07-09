const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

// const firestore = require('./firestore')();

const lang = require('../config/lang');

const commentsCollection = 'comments';
const votesCollection = 'votes';
const votersSubcollection = 'voters';

const fetchComments = async () => {
  const snapshot = await firestore.collection(commentsCollection).get();

  return snapshot.docs.map(doc => {
    return {
      id: doc.id,
      data: doc.data(),
      createTime: doc.createTime,
      updateTime: doc.updateTime
    }
  });
};

const addComment = async (user, comment) => {
  const newCommentCollection = firestore.collection(commentsCollection).doc();
  const newVoteCollection = firestore.collection(votesCollection).doc(newCommentCollection.id);

  return await firestore.runTransaction(t => {
    let promises = [];

    const comment = {
      user,
      comment,
      upvotes: 0,
      downvotes: 0
    };

    promises.push(t.set(newCommentCollection, comment));
    promises.push(t.set(newVoteCollection, {dummy: 0}));

    return Promise.all(promises)
      .then(() => Promise.resolve(comment))
      .catch(err => Promise.reject(err));
  });
};

const upvote = async (commentId, user) => {
  const commentRef = firestore.collection(commentsCollection).doc(commentId);
  const voteRef = firestore.collection(votesCollection)
    .doc(commentId)
    .collection(votersSubcollection)
    .doc(user);

  return await firestore.runTransaction(t => {
    return t.get(commentRef)
      .then(commentSnapshot => {
        if (! commentSnapshot.exists) {
          const error = new Error(lang.messages.error.comments.REFERENCE_ERROR.text);
          error.code = lang.messages.error.comments.REFERENCE_ERROR.code;
          error.status = 404;

          throw error;
        }

        const comment = {
          id: commentSnapshot.id,
          data: commentSnapshot.data(),
          createTime: commentSnapshot.createTime,
          updateTime: commentSnapshot.updateTime
        };

        return t.get(voteRef)
          .then(voteSnapshot => {
            if (voteSnapshot.exists) {
              const lastVote = voteSnapshot.data().vote;

              if (lastVote === 1) {
                // User has already upvoted this comment. Remove upvote and return.
                t.set(voteRef, {vote: 0});
                t.update(commentRef, {upvotes: comment.data.upvotes - 1});

                return Promise.resolve('UPVOTE_REMOVED');
              }

              else if (lastVote === -1) {
                // Last vote was downvote. Remove downvote and continue.
                t.update(commentRef, {downvotes: comment.data.downvotes - 1});
              }
            }

            t.set(voteRef, {vote: 1});

            const upvotes = comment.data.upvotes + 1;
            t.update(commentRef, {upvotes});

            return Promise.resolve('UPVOTE_SUCCESS');
          });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  });
};

const downvote = async (commentId, user) => {
  const commentRef = firestore.collection(commentsCollection).doc(commentId);
  const voteRef = firestore.collection(votesCollection)
    .doc(commentId)
    .collection(votersSubcollection)
    .doc(user);

  return await firestore.runTransaction(t => {
    return t.get(commentRef)
      .then(commentSnapshot => {
        if (! commentSnapshot.exists) {
          const error = new Error(lang.messages.error.comments.REFERENCE_ERROR.text);
          error.code = lang.messages.error.comments.REFERENCE_ERROR.code;
          error.status = 404;

          throw error;
        }

        const comment = {
          id: commentSnapshot.id,
          data: commentSnapshot.data(),
          createTime: commentSnapshot.createTime,
          updateTime: commentSnapshot.updateTime
        };

        return t.get(voteRef)
          .then(voteSnapshot => {
            if (voteSnapshot.exists) {
              const lastVote = voteSnapshot.data().vote;

              if (lastVote === -1) {
                // User has already downvoted this comment. Remove downvote and return.
                t.set(voteRef, {vote: 0});
                t.update(commentRef, {upvotes: comment.data.downvotes - 1});

                return Promise.resolve('DOWNVOTE_REMOVED');
              }

              else if (lastVote === 1) {
                // Last vote was upvote. Remove upvote and continue.
                t.update(commentRef, {upvotes: comment.data.upvotes - 1});
              }
            }

            t.set(voteRef, {vote: -1});

            const downvotes = comment.data.downvotes + 1;
            t.update(commentRef, {downvotes});

            return Promise.resolve('DOWNVOTE_SUCCESS');
          });
      })
      .catch(err => {
        return Promise.reject(err);
      });
  });
};

const findCommentOwner = async commentId => {
  const commentRef = firestore.collection(commentsCollection).doc(commentId);
  const comment = await commentRef.get();

  if (comment.exists) {
    const commentOwner = comment.data().user;
    return Promise.resolve(commentOwner);
  }

  const error = new Error(lang.messages.error.comments.REFERENCE_ERROR.text);
  error.code = lang.messages.error.comments.REFERENCE_ERROR.code;

  return Promise.reject(error);
};

module.exports = {
  fetchComments,
  addComment,
  upvote,
  downvote,
  findCommentOwner
};
