const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

router.get('/', async (req, res, next) => {
  try {
    const posts= await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({error});
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
      message: 'Handling POST request to /posts',
      createdPost: post
    });
  } catch (error) {
    res.status(500).json({error: error});
    next(error);
  }  
});

router.get('/:postId', async (req, res, next) => {

  try {
    const post = await Post.findById(req.params.postId);
    console.log("From database", post)
    post ? 
      res.status(200).json(post) : 
      res.status(404).json({ message: "No valid entry found for provided ID"});
  } catch (error) {
    res.status(500).json({ error: error });
    next(error);
  }
});

router.patch('/:postId', async (req, res, next) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const post = await Post.update({ _id: req.params.postId }, { $set: updateOps });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
    next(error);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const postDeleted = await Post.deleteOne({_id: req.params.postId});
    res.status(201).json(postDeleted);
  } catch (error) {
    res.status(500).json({error});
    next(error);
  }
});

module.exports = router;