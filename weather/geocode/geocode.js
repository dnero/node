const request = require('request');

let geocodeAddress = (address, cb) => {
	'use strict';
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
		json: true
	}, (error, response, body) => {
		'use strict';
		if(error) {
			cb('Unable to connect to Google servers.');
		} else if(body.status === 'ZERO_RESULTS'){
			cb(`Unable to find address: ${address}`);
		} else if(body.status === 'OK') {
			cb(undefined, {
				address: body.results[0].formatted_address,
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports = {
	geocodeAddress	
};