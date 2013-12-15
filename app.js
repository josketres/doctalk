var express = require('express');
var app = express();
var api = require('./app/routes/api');

//Set views path, template engine and default layout
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());

app.use(express.logger());
app.use('/static-managed', express.static(__dirname + '/bower_components'));
app.use('/static', express.static(__dirname + '/app/static'));

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/la/reforma-energetica', function(req, res) {
	res.render('reforma-energetica');
});

app.get('/api/document/:documentId/:paragraphId/comments', api.comments);
app.post('/api/document/:documentId/:paragraphId/comments', api.addComments);

app.listen(8000);
console.log('Listening on port 8000');

if (process.argv[2] == 'run-startup-scripts') {
	var appStart = require('./scripts/app-startup.js');
	appStart.startup();
}