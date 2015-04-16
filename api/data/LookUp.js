/**
 * The Lookup class is used for performing lookups on
 * static JSON data in the data directory.
 *
 * Each JSON file is loaded into a map and its contents 
 * are returned via the getter function.
 *
 * Lookup maps are then keyed on each object's id.
 */
var Map = require('../lib/Map.js'),
    IncidentType = require('./IncidentType.json'),
    IncidentAction = require('./IncidentAction.json'),
    VesselType = require('./VesselType.json'),
    VesselStatus = require('./VesselStatus.json'),
    TimeOfDay = require('./TimeOfDay.json'),
    Country = require('./Country.json');

function LookUp() {

    this.incidentType = new Map();
    this.incidentType.putArray(IncidentType, "id");
    this.incidentType = this.incidentType.contents;

    this.incidentAction = new Map();
    this.incidentAction.putArray(IncidentAction, "id");
    this.incidentAction = this.incidentAction.contents;

    this.vesselType = new Map();
    this.vesselType.putArray(VesselType, "id");
    this.vesselType = this.vesselType.contents;

    this.vesselStatus = new Map();
    this.vesselStatus.putArray(VesselStatus, "id");
    this.vesselStatus = this.vesselStatus.contents;

    this.timeOfDay = new Map();
    this.timeOfDay.putArray(TimeOfDay, "id");
    this.timeOfDay = this.timeOfDay.contents;

    this.country = new Map();
    this.country.putArray(Country, "id");
    this.country = this.country.contents;
}

module.exports = LookUp;
