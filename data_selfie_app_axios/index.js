const express = require('express');
const Datastore = require('nedb');

// defining routes 

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
// app use allows us to mount a file path or middleware
app.use(express.static('public'));
// using built in json middleware that 
// parses incoming requests with JSON payloads
// and limits json size on requests and response 
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
    // console.log(response.json(data))
  });
});

// post request from /api endpoint we did a get request from
app.post('/api', (request, response) => {
  const data = request.body;
  // console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
