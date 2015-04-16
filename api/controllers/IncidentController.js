var LookUp = require('../dao/LookUp.js');
var Countries = require('../dao/Countries.js');
/**
 * IncidentController
 *
 * @description :: Server-side logic for managing Incidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `IncidentController.index()`
     */
    index: function(req, res) {
        var params = req.params.all();

        var lookup = new LookUp(),
            incidentType = lookup.incidentType,
            incidentAction = lookup.incidentAction
            vesselType = lookup.vesselType
            vesselStatus = lookup.vesselStatus,
            countries = Countries;

        Incident.find()
            .exec(function(err, data) {
                for(var i = 0; i < data.length; i++) {
                    data[i].incidentType = incidentType[data[i].incidentType];
                    data[i].incidentAction = incidentAction[data[i].incidentAction];
                    data[i].vesselType = vesselType[data[i].vesselType];
                    data[i].vesselStatus = vesselStatus[data[i].vesselStatus];
                    data[i].vesselCountry = countries[data[i].vesselCountry];
                    data[i].waterCountry = countries[data[i].waterCountry];
                    data[i].closestCountry = countries[data[i].closestCountry];
                }
                return res.json(data);
            });
    }
};
