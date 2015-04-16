/**
 * The Lookup class is used for performing lookups on
 * static JSON data in the data directory.
 *
 * Each JSON file is loaded into a map and its contents 
 * are returned via the getter function.
 */
var Map = require('../lib/Map.js'),
    IncidentType = require('./IncidentType.json'),
    IncidentAction = require('./IncidentAction.json'),
    VesselType = require('./VesselType.json'),
    VesselStatus = require('./VesselStatus.json'),
    TimeOfDay = require('./TimeOfDay.json'),
    Country = require('./Country.json');


function LookUp() {

    this.getIncidentType = function() {
        var incidentType = new Map();
        incidentType.putArray(IncidentType, "id");
        return incidentType.contents;
    }

    this.getIncidentAction = function() {
        var incidentAction = new Map();
        incidentAction.putArray(IncidentAction, "id");
        return incidentAction.contents;
    }

    this.getVesselType = function() {
        var vesselType = new Map();
        vesselType.putArray(VesselType, "id");
        return vesselType.contents;
    }

    this.getVesselStatus = function() {
        var vesselStatus = new Map();
        vesselStatus.putArray(VesselStatus, "id");
        return vesselStatus.contents;
    }

    this.getTimeOfDay = function() {
        var timeOfDay = new Map();
        timeOfDay.putArray(TimeOfDay, "id");
        return timeOfDay.contents;
    }

    this.getCountry = function() {
        var country = new Map();
        country.putArray(Country, "id");
        return country.contents;
    }
}

module.exports = LookUp;
