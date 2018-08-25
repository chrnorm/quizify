'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const routes = require('./routes');

const port = process.env.PORT || 8888;

const app = express();

app.set('port', port);
app.use(logger('dev'))
    .use(session({ secret: 'quizify', cookie: { maxAge: 600000 } })) //TODO: implement prod-ready session store
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.resolve(__dirname, '../public')))
    .use('/', routes);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
