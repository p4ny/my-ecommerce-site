const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));

app.use('/api/contact', require('./routes/contact'));

app.listen(PORT, () => {
    console.log('Sever running at http://localhost:' + PORT);
});