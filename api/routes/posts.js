const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    // metadata
    const response = {
      count: posts.length,
      posts: posts.map(post => {
        return {
          title: post.title,
          url: post.url,
          _id: post._id,
          request: {
            type: "GET",
            url: "http://localhost:3001/posts/" + post._id
          }
        }
      })
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      url: req.body.url,
      createdDate: Date()
    });
    res.status(201).json({
      message: 'Created post successfully',
      createdPost: {
        title: post.title,
        url: post.url,
        _id: post._id,
        request: {
          type: "GET",
          url: "http://localhost:3001/posts/" + post._id
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => {

  try {
    const post = await Post.findById(req.params.postId);
    console.log("From database", post)
    post ? res.status(200).json(post) : res.status(404).json({ message: "No valid entry found for provided ID" });
  } catch (error) {
    next(error);
  }
});

router.patch('/:postId', async (req, res, next) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    await Post.update({ _id: req.params.postId }, { $set: updateOps });
    res.status(200).json({
      message: "Post updated",
      request: {
        type: "GET",
        url: "http://localhost:3001/posts/" + req.params.postId
      }
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const postDeleted = await Post.deleteOne({ _id: req.params.postId });
    res.status(201).json({
      message: "Post deleted",
      request: {
        type: "POST",
        url: "http://localhost:3001/posts",
        body: {title: "String", url: "String"}
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;