// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the request body
  const { content } = req.body;
  // Get the comments array for the post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the array
  comments.push({ id: commentId, content });
  // Update the comments array for the post id
  commentsByPostId[req.params.id] = comments;
  // Send back the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});