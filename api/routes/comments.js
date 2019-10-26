const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Comments were fetched!'
  });
});

router.post('/', (req, res, next) => {
  const comment = {
    postId: req.body.postId,
    body: req.body.body,
    createdDate: new Date()
  }
  res.status(201).json({
    message: 'Comment was created',
    comment: comment
  });
});

router.get('/:commentId', (req, res, next) => {
  res.status(200).json({
    message: 'Comment details',
    commentId: req.params.commentId
  });
});

router.delete('/:commentId', (req, res, next) => {
  res.status(200).json({
    message: 'Comment deleted!'
  });
});

module.exports = router;