const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('../routes/index');
const jwt = require('jsonwebtoken');
const config = require('../config');

// DB connection
mongoose.connect('mongodb://localhost:27017/books');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.on("open", function(callback){
    console.log("Connection Successful");
})

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.set('superSecret', config.secret)

routes(app);

app.listen(process.env.PORT || 8081)