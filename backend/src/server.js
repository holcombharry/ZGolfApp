const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5001;

// Import the route files
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roundRoutes = require('./routes/roundRoutes');

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zgolftrips', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up routes
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/rounds', roundRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Golf Trips API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
