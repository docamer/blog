const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to delete a blog post
router.delete('/:id', async (req, res) => {
  try {
      await db.run('DELETE FROM posts WHERE id = ?', req.params.id);
      res.redirect('/blogs');
  } catch (err) {
      console.error(err);
      res.redirect('/blogs');
  }
});
// Route to display all blog posts
router.get('/', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('index', { posts: rows });
  });
});

// Route to display the form for a new blog post
router.get('/new', (req, res) => {
  res.render('new');
});

// Route to add new

router.post('/', async (req, res) => {
  // Include the category in your INSERT statement
  const { title, content, category } = req.body;
  try {
      await db.run('INSERT INTO posts (title, content, category) VALUES (?, ?, ?)', [title, content, category]);
      res.redirect('/blogs');
  } catch (err) {
      console.error(err);
      res.render('new', { blog: blog, errorMessage: 'Error creating Blog' });
  }
});



module.exports = router;
