require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let port = 5001;
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('🚚 Welcome Home');
  res.status(200).send('🚚 Welcome Home');
});

app.post('/start', (req, res) => {
  console.log('🚚 /start', req.body);
  // start the Linux headless video publisher
  res.send('🚚 /start');
});

app.post('/stop', (req, res) => {
  console.log('🚚 /stop', req.body);
  // stop the PID assoc. to the Linux headless video publisher
  res.send('🚚 /stop');
});

app.listen(port, () => {
  console.log(`\n🌏 Server running at http://localhost:${port}\n`);
});
