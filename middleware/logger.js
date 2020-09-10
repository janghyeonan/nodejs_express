const moment = require('moment') //시간을 넣어주는 모듈

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${
        req.originalUrl
    }:${moment().format()}`
    );
    next();
};

module.exports = logger;