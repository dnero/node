const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	'use strict';
	if(errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);

		weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
			'use strict';
			if(errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`The temperature is ${weatherResults.temperature}, but it feels like ${weatherResults.feelsLike}.`)
			}
		});
	}
});