const express = require('express');
const router = express.Router();

const lang = require('../config/lang');
const commentUtil = require('../utils/comments');

const authMiddleware = require('../middlewares/auth');

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
          comment: ref._path
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        code: lang.messages.error.comments.NEW_COMMENT_FAILURE.code,
        message: lang.messages.error.comments.NEW_COMMENT_FAILURE.text
      });
    })
});

module.exports = router;
