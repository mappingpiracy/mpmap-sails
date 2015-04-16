var LookUp = require('../services/LookUp.js');

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
            vesselStatus = lookup.vesselStatus;

        Incident.find()
            .exec(function(err, data) {
                for(var i = 0; i < data.length; i++) {
                    data[i].incidentType = incidentType[data[i].incidentType];
                    data[i].incidentAction = incidentAction[data[i].incidentAction];
                    data[i].vesselType = vesselType[data[i].vesselType];
                    data[i].vesselStatus = vesselStatus[data[i].vesselStatus];
                }
                return res.json(data);
            });
    }
};
