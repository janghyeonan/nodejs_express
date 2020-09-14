//모듈 선언
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const moment = require('moment') //시간을 넣어주는 모듈
const logger = require('./middleware/logger');
const members = require('./Members');
const { response } = require('express');
const { request } = require('http');

//exoress
const app = express();

//init moddleware
app.use(logger);

//handlebars Middleware html파일과 연결
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
})
);

// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//member api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serverstart on port ${PORT}`));