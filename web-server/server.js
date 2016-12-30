const express = require('express');
const hbs = require('hbs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs'); // configure the templating engine
app.use(express.static(__dirname + '/public'));

// PARTIAL REGISTERS
hbs.registerHelper('getCurrentYear', () => {
	"use strict";
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (txt) => {
	"use strict";
	return txt.toUpperCase();
});

// ROUTES

app.get('/', (req, res) => {
	"use strict";
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to my house'
	});
});

app.get('/about', (req, res) => {
	"use strict";
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	"use strict";
	res.send({
		errorMessage: 'Error handling request'
	});
});

app.listen(3000, () => {
	"use strict";
	console.log('Server is up on port 3k.')
});