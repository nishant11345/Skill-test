
const express = require('express');
const cors = require('cors');  
const eventsRouter = require('./routes/events');

const app = express();
const port = 4000;

app.use(express.json());

app.use(cors());

app.use('/api/events', eventsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Event API');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
