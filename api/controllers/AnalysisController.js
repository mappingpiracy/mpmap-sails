/**
 * AnalysisController
 *
 * @description :: Server-side logic for managing analyses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Map = require('../lib/Map.js');

module.exports = {

	/**
	 * `AnalysisController.IncidentsPerYear()`
	 *
	 * Find the number of incidents for the countries from beginYear to endYear
	 * Return an array of objects as follows:
	 * [{key: country name, values: [{x: year, y: number of incidents }]}]
	 * If the countries parameter is 0, return the top limit countries in descending order.
	 * 
	 */
	incidentsPerYear: function(req, res) {
		var params = req.params.all(),
			beginDate = params['beginDate'],
			endDate = params['endDate'],
			countries = params['countries'],
			limit = params['limit'],
			completeData = new Map(),
			returnData = [];

		if (countries === '0') {
			countries = undefined;
		}

		filter = Incident.buildFilter({
			closestCountry: countries,
			beginDate: new Date(beginDate),
			endDate: new Date(endDate)
		});

		Incident.find(filter)
			.exec(function(err, data) {
				if(err) return res.json(err);
				// Build a complete map of country -> year -> yearSum
				data.map(function(d) {
					var countryName = LookupService.country.byId(d.closestCountry).name;
						year = d.datetime.getFullYear(),
						country = completeData.find(countryName);
					if (country === null) {
						country = completeData.put(countryName, new Map());
					}
					var yearSum = country.find(year);
					if (yearSum === null) {
						yearSum = country.put(year, 0);
					}
					country.put(year, yearSum + 1);
				});

				// Convert the complete map to a list of objects with format
				// {key: country name, values: [{x: year, y: year sum }]}
				completeData.keys()
					.map(function(country) {
						returnData.push({
							key: country,
							values: completeData.find(country)
								.keys()
								.map(function(year) {
									var yearSum = completeData.find(country).find(year);
									return {
										x: year,
										y: yearSum
									};
								})
						})
					});

				// Sort the return data by total of incidents
				returnData.sort(function(a, b) {
					var aSum = 0,
						bSum = 0;
					a.values.map(function(v) {
						aSum += v.y;
					})
					b.values.map(function(v) {
						bSum += v.y;
					})
					if (aSum < bSum) return 1;
					if (aSum > bSum) return -1;
					return 0;
				})

				// Return a subset if limit is set
				if(limit > 0) {
					return res.json(returnData.splice(0, limit));
				} else {
					return res.json(returnData);	
				}
			});
	}
};
