const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/html/homepg.html');
  });
app.get('/api-key', (req, res) => {
    const apiKey = process.env.API_KEY;
    res.json({ apiKey });
  });

  app.listen(3000, function() {
  console.log('Server started on port 3000.');
}); 
