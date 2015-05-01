var Map = require('../lib/Map.js'),
    country = require('./Country.obj.json'),
    incidentType = require('./IncidentType.obj.json'),
    incidentAction = require('./IncidentAction.obj.json'),
    vesselType = require('./VesselType.obj.json'),
    vesselStatus = require('./VesselStatus.obj.json');

module.exports = {
    country: {
        byId: function(id) {
            if(country[id] !== undefined) return country[id];
            return {};
        },
        byName: function(name) {
            return {};
        },
        all: function() {
        	return country;
        }
    },
    incidentAction: {
    	byId: function(id) {
    		if(incidentAction[id] !== undefined) return incidentAction[id];
    		return {};
    	},
    	all: function() {
    		return incidentAction;
    	}
    },
    incidentType: {
        byId: function(id) {
        	if(incidentType[id] !== undefined) return incidentType[id];
    		return {};
        },
        all: function() {
        	return incidentType;
        }
    },
    vesselType: {
    	byId: function(id) {
    		if(vesselType[id] !== undefined) return vesselType[id];
    		return {}
    	},
    	all: function() {
    		return vesselType;
    	}
    },
    vesselStatus: {
    	byId: function(id) {
    		if(vesselStatus[id] !== undefined) return vesselStatus[id];
    		return {};
    	}, 
    	all: function() {
    		return vesselStatus;
    	}
    }
}
