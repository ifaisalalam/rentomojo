const express = require('express');
const router = express.Router();

const lang = require('../config/lang');
const commentUtil = require('../utils/comments');

const authMiddleware = require('../middlewares/authMiddleware');
const commentMiddleware = require('../middlewares/commentMiddleware');

router.use(authMiddleware.user);

router.get('/', (req, res, next) => {
  commentUtil.fetchComments()
    .then(comments => {
      res.status(200).json({
        status: 'success',
        code: lang.messages.success.comments.retrieve.COMMENTS_RETRIEVED.code,
        message: lang.messages.success.comments.retrieve.COMMENTS_RETRIEVED.text,
        payload: {
          comments
        }
      });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        code: lang.messages.error.generic.UNKNOWN_ERROR.code,
        message: lang.messages.error.generic.UNKNOWN_ERROR.text
      });
    });
});

router.post('/add', (req, res, next) => {
  const user = req.payload.username;
  const comment = req.body.comment;

  commentUtil.addComment(user, comment)
    .then(ref => {
      res.status(201).json({
        status: 'success',
        code: lang.messages.success.comments.add.COMMENT_ADDED.code,
        message: lang.messages.success.comments.add.COMMENT_ADDED.text,
        payload: {
          comment: ref
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        code: lang.messages.error.comments.NEW_COMMENT_FAILURE.code,
        message: lang.messages.error.comments.NEW_COMMENT_FAILURE.text
      });

      console.log(err);
    })
});

router.post('/upvote', commentMiddleware.canVote, (req, res, next) => {
  const commentRef = req.body.commentId;

  commentUtil.upvote(commentRef, req.payload.username)
    .then(comment => {
      const data = {
        status: 'success',
        code: lang.messages.success.comments.vote.UPVOTE_SUCCESS.code,
        message: lang.messages.success.comments.vote.UPVOTE_SUCCESS.text,
        payload: {
          comment
        }
      };

      res.status(201).json(data);
    })
    .catch(err => {
      const data = {
        status: 'error',
        code: lang.messages.error.vote.VOTE_ERROR.code,
        message: lang.messages.error.vote.VOTE_ERROR.text
      };

      res.status(500).json(data);
    });
});

router.post('/downvote', commentMiddleware.canVote, (req, res, next) => {
  const commentRef = req.body.commentId;

  commentUtil.downvote(commentRef, req.payload.username)
    .then(comment => {
      const data = {
        status: 'success',
        code: lang.messages.success.comments.vote.DOWNVOTE_SUCCESS.code,
        message: lang.messages.success.comments.vote.DOWNVOTE_SUCCESS.text,
        payload: {
          comment
        }
      };

      res.status(201).json(data);
    })
    .catch(err => {
      const data = {
        status: 'error',
        code: lang.messages.error.vote.VOTE_ERROR.code,
        message: lang.messages.error.vote.VOTE_ERROR.text
      };

      res.status(500).json(data);
    });
});

module.exports = router;
