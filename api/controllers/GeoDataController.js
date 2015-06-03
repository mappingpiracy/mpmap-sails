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
            // Convert the params to an ORM-friendly filter
            filter = Incident.buildFilter(params); 

        // Retrieve the incidents from the database;
        // replace ids with names (i.e. country id w/ country name);
        // convert data to the specified format, and return.
        Incident.find(filter).exec(function(err, data) {
            if(err) {
                console.error(err);
                return res.send([]);
            } else {
                data = Incident.replaceIdsWithNames(data);
                data = Incident.format(data, format);
                return res.send(data);    
            }
        })

    },
    /**
     * Return an array of years in which incidents have occurred
     */
    dateRange: function(req, res) {
        Incident.find({
            select: ['id', 'date'],
            sort: 'date DESC'
        }).
        exec(function(err, data) {
            var years = {};
            data.map(function(d) {
                try {
                    years[d.date.getFullYear()] = null;
                } catch(err) {
                    console.error(err);
                }
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
