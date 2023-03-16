const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/page/homepg.html');
  });
app.get('/api-key', (req, res) => {
    const apiKey = process.env.API_KEY;
    res.json({ apiKey });
  });

  app.listen(8080, function() {
  console.log('Server started on port 8080.');
}); 
