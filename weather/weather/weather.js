const request = require('request');

let getWeather = (lat, lng, cb) => {
	request({
		url: `https://api.darksky.net/forecast/d91569e5d45a52890f63719976f07d26/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		'use strict';
		if (!error && response.statusCode === 200) {
			cb(undefined, {
				temperature: body.currently.temperature,
				feelsLike: body.currently.apparentTemperature
			});
		} else {
			cb('Unable to fetch weather');
		}
	});
};

module.exports.getWeather = getWeather;