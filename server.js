const express = require('express');
const gzip = require('compression');
const request = require('request');
const app = express();
const contentData = require('./public/content.json')
const firstCard = require('./public/first-card.json')

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

// gzip
app.use(gzip({
	threshold: 0,
	filter: () => true, // Compress all assets by default
}));

app.get('/', function (req, res) {
	res.render('index', { data: contentData, firstCard});
});

// app.get('/:id', function (req, res) {
// 	const filteredData = filterByName(req.params.id);
// 	const infoOfCreator = getCreatorInfo(req.params.id);
// 	res.render('person', { creatorWork: filteredData, creatorInfo: infoOfCreator, creatorWorkImages });
// });


const server = app.listen(6969, function () {
	console.log('server is running on port 6969');
});
