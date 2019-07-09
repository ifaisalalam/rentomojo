const commentUtil = require('../utils/comments');
const lang = require('../config/lang');

module.exports = {
  canVote: (req, res, next) => {
    if (req.path === '/upvote' || req.path === '/downvote') {
      const user = req.payload.user.username;

      const comment = req.body.commentId;
      const commentOwner = commentUtil.findCommentOwner(comment);

      if (commentOwner.username === user) {
        return res.status(403).json({
          status: 'error',
          code: lang.messages.error.vote.SELF_VOTE_ERR.code,
          message: lang.messages.error.vote.SELF_VOTE_ERR.text
        });
      }
    }

    next();
  }
};
