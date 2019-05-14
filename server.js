var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config/database.config');
var indexRouter = require('./app/routes/index');
var assignmentRouter = require('./app/routes/assignments');
var employeesRouter = require('./app/routes/employees');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/assignments', assignmentRouter);
app.use('/employees', employeesRouter);

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});