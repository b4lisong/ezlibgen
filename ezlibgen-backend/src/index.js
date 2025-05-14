const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { processBookList } = require('./services/bookProcessor');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/process-books', async (req, res) => {
  try {
    const { bookList } = req.body;
    
    if (!bookList || !bookList.trim()) {
      return res.status(400).json({ error: 'Book list is required' });
    }
    
    const result = await processBookList(bookList);
    res.json(result);
  } catch (error) {
    console.error('Error processing books:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing the book list',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 