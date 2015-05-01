/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var LookUp = require('../data/LookUp.js'),
	lookup = new LookUp();

module.exports = {
	
	index: function(req, res) {
		return res.json(lookup.country);
	}

};

