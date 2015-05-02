var Map = require('../lib/Map.js'),
    country = require('./LookupServiceData/Country.obj.json'),
    incidentType = require('./LookupServiceData/IncidentType.obj.json'),
    incidentAction = require('./LookupServiceData/IncidentAction.obj.json'),
    vesselType = require('./LookupServiceData/VesselType.obj.json'),
    vesselStatus = require('./LookupServiceData/VesselStatus.obj.json'),
    timeOfDay = require('./LookupServiceData/TimeOfDay.obj.json');

/**
 * convert an object to an array
 */
var toArray = function(obj) {
    return Object.keys(obj)
        .map(function(k) {
            return obj[k];
        });
}

module.exports = {
    country: {
        byId: function(id) {
            if (country[id] !== undefined) return country[id];
            return {};
        },
        all: function() {
            return toArray(country);
        }
    },
    incidentAction: {
        byId: function(id) {
            if (incidentAction[id] !== undefined) return incidentAction[id];
            return {};
        },
        all: function() {
            return toArray(incidentAction);
        }
    },
    incidentType: {
        byId: function(id) {
            if (incidentType[id] !== undefined) return incidentType[id];
            return {};
        },
        all: function() {
            return toArray(incidentType);
        }
    },
    vesselType: {
        byId: function(id) {
            if (vesselType[id] !== undefined) return vesselType[id];
            return {}
        },
        all: function() {
            return toArray(vesselType);
        }
    },
    vesselStatus: {
        byId: function(id) {
            if (vesselStatus[id] !== undefined) return vesselStatus[id];
            return {};
        },
        all: function() {
            return toArray(vesselStatus);
        }
    },
    timeOfDay: {
        byId: function(id) {
            if (timeOfDay[id] !== undefined) return timeOfDay[id];
            return {};
        },
        all: function() {
            return toArray(timeOfDay);
        }
    }
}