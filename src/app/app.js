const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SERVER_CONFIG = require('../config/server.config');
const CONNECT_MONGO = require('../config/mongo.connection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.options("*",cors());
app.use(cors());

app.use(session({ secret: 'todo-app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to TODO application."});
});

CONNECT_MONGO();


require('./repositories/User.Repository');
require('../config/passport.config');
app.use(require('./routes'));

app.listen(SERVER_CONFIG['PORT'], () => console.log('Application Running'));

