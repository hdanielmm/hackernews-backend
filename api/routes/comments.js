const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Comment = require("../models/comment");
const Post = require("../models/post")

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({
      count: comments.length,
      comments: comments.map(comment => {
        return {
          _id: comment._id,
          post: comment.post,
          body: comment.body,
          request: {
            type: "GET",
            url: "http://localhost:3000/comments/" + comment._id
          }
        }
      })
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const postId = await Post.findById(req.body.postId);
    if (postId._id) {
      const comment = await Comment.create({
        post: req.body.postId,
        body: req.body.body,
        createdDate: Date()
      });
      res.status(201).json({
        message: 'Comment published',
        createdComment: {
          _id: comment._id,
          postId: comment.post,
          body: comment.body,
          createdDate: comment.createdDate
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/comments/" + comment._id
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:commentId', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found!"});
    }
    res.status(200).json({
      comment: comment,
      request: {
        type: "GET",
        url: "http://localhost:3000/comments"
      }
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  try {
    const comment = await Comment.deleteOne({ _id: req.params.commentId});
    res.status(201).json({
      message: 'Comment deleted!',
      comment: comment,
      request: {
        type: "POST",
        url: "http://localhost:3000/comments",
        body: { postId: "ID", url: "String" }
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;