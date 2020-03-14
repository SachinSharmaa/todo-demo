const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const SERVER_CONFIG = require('../config/server.config');
const CONNECT_MONGO = require('../config/mongo.connection');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.options("*",cors());
app.use(cors());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to TODO application."});
});

CONNECT_MONGO();

app.listen(SERVER_CONFIG['PORT'], () => console.log('Application Running'));

