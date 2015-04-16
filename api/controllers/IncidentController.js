/**
 * IncidentController
 *
 * @description :: Server-side logic for managing Incidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var LookUp = require('../data/LookUp.js'),
    GeoJSON = require('geojson'),
    lookup = new LookUp();

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
                    data[i].incidentType = lookup.incidentType[data[i].incidentType];
                    data[i].incidentAction = lookup.incidentAction[data[i].incidentAction];
                    data[i].vesselType = lookup.vesselType[data[i].vesselType];
                    data[i].vesselStatus = lookup.vesselStatus[data[i].vesselStatus];
                    data[i].vesselCountry = lookup.country[data[i].vesselCountry];
                    data[i].waterCountry = lookup.country[data[i].waterCountry];
                    data[i].closestCountry = lookup.country[data[i].closestCountry];
                    data[i].timeOfDay = lookup.timeOfDay[data[i].timeOfDay];
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
