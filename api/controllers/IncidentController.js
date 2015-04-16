/**
 * IncidentController
 *
 * @description :: Server-side logic for managing Incidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var LookUp = require('../data/LookUp.js'),
    GeoJSON = require('geojson'),
    lookup = new LookUp(),
    incidentType = lookup.getIncidentType(),
    incidentAction = lookup.getIncidentAction(),
    vesselType = lookup.getVesselType(),
    vesselStatus = lookup.getVesselStatus(),
    countries = lookup.getCountry();
    timeOfDay = lookup.getTimeOfDay();

module.exports = {

    /**
     * `IncidentController.index()`
     *
     * /incident/:format[''|geojson]
     *
     * De-facto API for incidents. Handles URL paramaters
     * and returns either JSON or GeoJSON based on format
     */
    index: function(req, res) {

        var params = req.params.all(),
            format = params['format'],
            filter = Incident.buildFilter(params);

        Incident.find(filter)
            .exec(function(err, data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].incidentType = incidentType[data[i].incidentType];
                    data[i].incidentAction = incidentAction[data[i].incidentAction];
                    data[i].vesselType = vesselType[data[i].vesselType];
                    data[i].vesselStatus = vesselStatus[data[i].vesselStatus];
                    data[i].vesselCountry = countries[data[i].vesselCountry];
                    data[i].waterCountry = countries[data[i].waterCountry];
                    data[i].closestCountry = countries[data[i].closestCountry];
                    data[i].timeOfDay = timeOfDay[data[i].timeOfDay];
                }
                if (format === 'geojson') {
                    data = GeoJSON.parse(data, {
                        Point: ['latitude', 'longitude']
                    });
                }
                return res.json(data);
            });
    }
};
