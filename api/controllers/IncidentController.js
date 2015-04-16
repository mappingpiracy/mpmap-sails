var LookUp = require('../data/IncidentLookUp.js');
var Countries = require('../data/Countries.js');
var GeoJSON = require('geojson');
/**
 * IncidentController
 *
 * @description :: Server-side logic for managing Incidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var lookup = new LookUp(),
    incidentType = lookup.incidentType,
    incidentAction = lookup.incidentAction,
    vesselType = lookup.vesselType,
    vesselStatus = lookup.vesselStatus,
    countries = Countries;

module.exports = {

    /**
     * `IncidentController.index()`
     */
    index: function(req, res) {

        var params = req.params.all(),
            format = params['format'];

        Incident.find()
            .exec(function(err, data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].incidentType = incidentType[data[i].incidentType];
                    data[i].incidentAction = incidentAction[data[i].incidentAction];
                    data[i].vesselType = vesselType[data[i].vesselType];
                    data[i].vesselStatus = vesselStatus[data[i].vesselStatus];
                    data[i].vesselCountry = countries[data[i].vesselCountry];
                    data[i].waterCountry = countries[data[i].waterCountry];
                    data[i].closestCountry = countries[data[i].closestCountry];
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
