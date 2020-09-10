const express = require('express');
const path = require('path');
const moment = require('moment') //시간을 넣어주는 모듈
const logger = require('./middleware/logger')
const members = require('./Members');



//31분부터...

const app = express();


//init moddleware
app.use(logger);

//get all members
app.get('/api/members', (req, res) => res.json(members));


// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serverstart on port ${PORT}`));