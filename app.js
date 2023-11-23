const express = require('express');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));
app.use(express.static('public'));
const blogRoutes = require('./routes/blogRoutes'); // Ensure this path is correct
const db = require('./database'); // Ensure this path is correct to your database setup file

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Body parser for form data

// Routes
app.get('/', (req, res) => res.redirect('/blogs')); // Redirect root to the blogs
app.use('/blogs', blogRoutes);

// Database initialization (optional here if you have it in your database.js)
// db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
