/**
 * MapDataController
 *
 * @description :: Server-side logic for managing Mapdatas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GeoJSON = require('geojson');

module.exports = {

    /**
     * `MapDataController.index()`
     */
    index: function(req, res) {
        return res.json({
            todo: 'index() is not implemented yet!'
        });
    },

    /**
     * `MapDataController.incident()`
     */
    incident: function(req, res) {
        var params = req.params.all(),
            format = params['format'],
            filter = Incident.buildFilter(params);

        Incident.find(filter)
            .exec(function(err, data) {
                for (var i = 0; i < data.length; i++) {
                    // data[i].incidentType = lookup.incidentType[data[i].incidentType];
                    // data[i].incidentAction = lookup.incidentAction[data[i].incidentAction];
                    // data[i].vesselType = lookup.vesselType[data[i].vesselType];
                    // data[i].vesselStatus = lookup.vesselStatus[data[i].vesselStatus];
                    // data[i].vesselCountry = lookup.country[data[i].vesselCountry];
                    // data[i].waterCountry = lookup.country[data[i].waterCountry];
                    // data[i].closestCountry = lookup.country[data[i].closestCountry];
                    // data[i].timeOfDay = lookup.timeOfDay[data[i].timeOfDay];
                }
                if (format === 'geojson') {
                    data = GeoJSON.parse(data, {
                        Point: ['latitude', 'longitude']
                    });
                }
                return res.json(data);
            });
    },

    /**
     * `MapDataController.country()`
     */
    country: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.country.byId(req.params.id));
        } else {
            return res.json(LookupService.country.all());    
        }
    },

    /**
     * `MapDataController.incidentAction()`
     */
    incidentAction: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.incidentAction.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentAction.all());
        }
    },

    /**
     * `MapDataController.incidentType()`
     */
    incidentType: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.incidentType.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentType.all());    
        }
    },

    /**
     * `MapDataController.vesselType()`
     */
    vesselType: function(req, res) {
        if(req.params.id !== undefined) {
           return res.json(LookupService.vesselType.byId(req.params.id));
        }
        return res.json(LookupService.vesselType.all());
    },

    /**
     * `MapDataController.vesselStatus()`
     */
    vesselStatus: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.vesselStatus.byId(req.params.id));    
        } else {
            return res.json(LookupService.vesselStatus.all());
        }
        
    },
};
