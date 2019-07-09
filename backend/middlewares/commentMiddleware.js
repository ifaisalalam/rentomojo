const commentUtil = require('../utils/comments');
const lang = require('../config/lang');

module.exports = {
  canVote: (req, res, next) => {
    const user = req.payload.user.username;
    const comment = req.body.commentId;

    commentUtil.findCommentOwner(comment)
      .then(commentOwner => {

        // User cannot vote its own comment.
        if (commentOwner.username === user) {
          return res.status(403).json({
            status: 'error',
            code: lang.messages.error.vote.SELF_VOTE_ERR.code,
            message: lang.messages.error.vote.SELF_VOTE_ERR.text
          });
        }

        // Else user can vote the comment. Continue.
        throw new Error();
      })
      .catch(err => {
        if (err.code === lang.messages.error.comments.REFERENCE_ERROR.code) {
          return res.status(404).json({
            status: 'error',
            code: err.code,
            message: err.message
          });
        }

        next();
      });
  }
};
