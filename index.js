const express = require('express');
const path = require('path');
const moment = require('moment') //시간을 넣어주는 모듈
const logger = require('./middleware/logger');
const { response } = require('express');
const { request } = require('http');

const app = express();

//init moddleware
app.use(logger);


//body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));



// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//member api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serverstart on port ${PORT}`));