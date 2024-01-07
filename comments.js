// Create web server
// Run: node comments.js
// Open browser: http://localhost:3000
// 2nd option: nodemon comments.js
// 3rd option: node-dev comments.js
// 4th option: node comments.js
// 5th option: npm start
// 6th option: npm run dev

const express = require('express');
const app = express();

// Load static files
app.use(express.static('public'));

// Load view engine
app.set('view engine', 'ejs');

// Listen to port
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Load routes
const index = require('./routes/index');
const comments = require('./routes/comments');

// Use routes
app.use('/', index);
app.use('/comments', comments);