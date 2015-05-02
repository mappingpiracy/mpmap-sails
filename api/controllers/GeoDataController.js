/**
 * MapDataController
 *
 * @description :: Server-side logic for managing Mapdatas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GeoJSON = require('geojson');

module.exports = {

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
     * Return an array of years in which incidents have occurred
     */
    dateRange: function(req, res) {
        Incident.find({select: ['datetime'], sort: 'datetime DESC'}).
            exec(function(err, data) {
                var years = {};
                data.map(function(d) {
                    years[d.datetime.getFullYear()] = null;
                })
                return res.json(Object.keys(years));
            })

    },
    country: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.country.byId(req.params.id));
        } else {
            return res.json(LookupService.country.all());    
        }
    },
    incidentAction: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.incidentAction.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentAction.all());
        }
    },
    incidentType: function(req, res) {
        if(req.params.id !== undefined) {
            return res.json(LookupService.incidentType.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentType.all());    
        }
    },
    vesselType: function(req, res) {
        if(req.params.id !== undefined) {
           return res.json(LookupService.vesselType.byId(req.params.id));
        }
        return res.json(LookupService.vesselType.all());
    },
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
