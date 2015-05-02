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
                data.map(function(d) {
                    d.incidentType = LookupService.incidentType.byId(d.incidentType);
                    d.incidentAction = LookupService.incidentAction.byId(d.incidentAction);
                    d.vesselType = LookupService.vesselType.byId(d.vesselType);
                    d.vesselStatus = LookupService.vesselStatus.byId(d.vesselStatus);
                    d.vesselCountry = LookupService.country.byId(d.vesselCountry);
                    d.waterCountry = LookupService.country.byId(d.waterCountry);
                    d.closestCountry = LookupService.country.byId(d.closestCountry);
                    d.timeOfDay = LookupService.timeOfDay.byId(d.timeOfDay);
                      
                });
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
    timeOfDay: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.timeOfDay.byId(req.params.id));
        } else {
            return res.json(LookupService.timeOfDay.all());    
        }
    }
};
