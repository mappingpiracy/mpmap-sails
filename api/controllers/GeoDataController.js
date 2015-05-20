/**
 * GeoDataController
 *
 * @description :: Server-side logic for managing Mapdatas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var GeoJSON = require('geojson'),
    json2csv = require('json2csv'),
    GJV = require("geojson-validation");

module.exports = {

    /**
     * Retrieve incidents with passed parameters, return them in the format specified (geojson, csv, or json)
     * @param  {object} req the http request
     * @param  {object} res the http response
     * @return {object}     An object in format geojson, csv, or json depending on format parameter.
     */
    incident: function(req, res) {
        var params = req.params.all(),
            format = params['format'],
            filter = Incident.buildFilter(params);
        Incident.find(filter)
            .exec(function(err, data) {
                data.map(function(d) {
                    d.incidentType = LookupService.incidentType.byId(d.incidentType).name;
                    d.incidentAction = LookupService.incidentAction.byId(d.incidentAction).name;
                    d.vesselType = LookupService.vesselType.byId(d.vesselType).name;
                    d.vesselStatus = LookupService.vesselStatus.byId(d.vesselStatus).name;
                    d.vesselCountry = LookupService.country.byId(d.vesselCountry).name;
                    d.waterCountry = LookupService.country.byId(d.waterCountry).name;
                    d.closestCountry = LookupService.country.byId(d.closestCountry).name;
                    d.timeOfDay = LookupService.timeOfDay.byId(d.timeOfDay).name;
                });
                /**
                 * Convert to geojson and remove invalid features.
                 */
                if (format === 'geojson') {
                    data = GeoJSON.parse(data, {
                        Point: ['latitude', 'longitude']
                    });
                    data.features.forEach(function(d, i) {
                        if(!GJV.valid(d)) data.features.splice(i, 1);
                    })
                }
                /**
                 * Convert to CSV
                 */
                else if (format === 'csv') {
                    json2csv({
                        data: data,
                        fields: Incident.getAttributes()
                    }, function(err, csv) {
                        if (err) console.log(err);
                        data = csv;
                    });
                }
                return res.send(data);
            });
    },
    /**
     * Return an array of years in which incidents have occurred
     */
    dateRange: function(req, res) {
        Incident.find({
            select: ['date'],
            sort: 'date DESC'
        }).
        exec(function(err, data) {
            var years = {};
            data.map(function(d) {
                years[d.date.getFullYear()] = null;
            })
            return res.json(Object.keys(years));
        })

    },
    country: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.country.byId(req.params.id));
        } else {
            return res.json(LookupService.country.all());
        }
    },
    incidentAction: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.incidentAction.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentAction.all());
        }
    },
    incidentType: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.incidentType.byId(req.params.id));
        } else {
            return res.json(LookupService.incidentType.all());
        }
    },
    vesselType: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.vesselType.byId(req.params.id));
        }
        return res.json(LookupService.vesselType.all());
    },
    vesselStatus: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.vesselStatus.byId(req.params.id));
        } else {
            return res.json(LookupService.vesselStatus.all());
        }

    },
    timeOfDay: function(req, res) {
        if (req.params.id !== undefined) {
            return res.json(LookupService.timeOfDay.byId(req.params.id));
        } else {
            return res.json(LookupService.timeOfDay.all());
        }
    }
};
