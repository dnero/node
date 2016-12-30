const yargs = require('yargs');
const axios = require('axios');

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

//let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geocodeUrl).then( (response) => {
	"use strict";
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address.');
	}
	
	let lat = response.data.results[0].geometry.location.lat, 
		lng = response.data.results[0].geometry.location.lng,
		weatherUrl = `https://api.darksky.net/forecast/d91569e5d45a52890f63719976f07d26/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	
	return axios.get(weatherUrl).then( (response) => {
		let temperature = response.data.currently.temperature,
			feelsLike = response.data.currently.apparentTemperature;
		
		console.log(`It's currently ${temperature}, but it feels like ${feelsLike}.`);
	}).catch( (e) => {
		
	});
	
}).catch( (e) => {
	"use strict";
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to API servers.');
	} else {
		console.log(e.message);
	}
});