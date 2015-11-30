'use srtict';

var express = require('express'),
	posts = require('./mock-data/posts.json');

var PORT = 3000;
var postList = Object.keys(posts).map(function(key){
						var post = posts[key];
						post.title = key;
						return post;
					});

var app = express();

app.use('/static/', express.static(__dirname + '/public'));

app.set("view engine", 'jade');
app.set('views', __dirname + '/templates/');

app.get('/', function(req, res){
	res.locals.home = true;
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if(title === undefined){
		res.status(503);
		res.render('blog', {'posts': postList});
	} else{
		var post = posts[title] || {};
		res.render('post', {'post': post});
	}
});

app.listen(PORT, function(){
	console.log("The frontend server is running on PORT: " + PORT);
});