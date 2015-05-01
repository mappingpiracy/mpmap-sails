mpmap.service('IncidentStatisticsModel', function() {
	
	var model = {
		incidentCount: 0,
		closestCountryCount: 0,
		waterCountryCount: 0,
		vesselCountryCount: 0
	};

	function initialize(features) {
		var i, feature, closestCountries = {}, waterCountries = {}, vesselCountries = {};
		for(i = 0; i < features.length; i++) {
			feature = features[i];
			closestCountries[feature.properties.closestCountry] = true;
			waterCountries[feature.properties.waterCountry] = true;
			vesselCountries[feature.properties.vesselCountry] = true;
		}
		model.incidentCount = features.length;
		model.closestCountryCount = Object.keys(closestCountries).length;
		model.waterCountryCount = Object.keys(waterCountries).length;
		model.vesselCountryCount = Object.keys(vesselCountries).length;
	}

	return function(features) {
		if(arguments.length === 1) {
			initialize(features);
		}		
		return model;
	};
});