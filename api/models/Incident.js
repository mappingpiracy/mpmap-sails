/**
 * Incident.js
 *
 * @description :: Incident Class. Also contains a buildFilter function that
 * returns a waterline filter based on passed parameters.
 */

var GeoJSON = require('geojson'),
    json2csv = require('json2csv'),
    GJV = require("geojson-validation");

module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    migrate: 'alter',

    attributes: {

        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },

        referenceId: {
            type: 'integer',
            unique: true,
            notNull: true
        },

        date: {
            type: 'date',
            notNull: true
        },

        time: {
            type: 'time'
        },

        timeRecode: {
            type: 'integer'
        },

        incidentType: {
            type: 'integer'
        },

        incidentAction: {
            type: 'integer'
        },

        latitude: {
            type: 'float',
            notNull: true
        },

        longitude: {
            type: 'float',
            notNull: true
        },

        geolocationSource: {
            type: 'string'
        },

        closestCountry: {
            type: 'integer'
        },

        waterCountry: {
            type: 'integer'
        },

        locationDescription: {
            type: 'string',
            defaultsTo: 'Unknown'
        },

        vesselName: {
            type: 'string',
            defaultsTo: 'Unknown'
        },

        vesselType: {
            type: 'integer'
        },

        vesselCountry: {
            type: 'integer'
        },

        vesselStatus: {
            type: 'integer'
        },

        violenceDummy: {
            type: 'boolean'
        }
    },

    getAttributes: function() {
        return Object.keys(Incident._attributes);
    },

    /**
     * Converts the passed data to the passed format
     * @param  {list} data   List of incidents
     * @param  {string} format 'json', 'geojson', 'csv'
     * @return {list}        The converted list of incidents
     */
    format: function(data, format) {
        
        // Convert to geojson;
        // remove features which don't pass validation.
        if (format === 'geojson') {
            data = GeoJSON.parse(data, {
                Point: ['latitude', 'longitude']
            });
            data.features.forEach(function(d, i) {
                if (!GJV.valid(d)) data.features.splice(i, 1);
            })
        }
        
        // Convert to CSV
        else if (format === 'csv') {
            json2csv({
                data: data,
                fields: Incident.getAttributes()
            }, function(err, csv) {
                if (err) console.error(err);
                data = csv;
            });
        }

        // Data is in JSON format by default
        return data;
    },

    /**
     * Replaces the following numerical ID properties with their
     * corresponding names: incident type, incident action, vessel type,
     * vessel status, vessel country, water country, closest country,
     * time of day
     * 
     * @param  {list} data The list of incidents
     * @return {list}      The list of incidents with Ids replaced.
     */
    replaceIdsWithNames: function(data) {
        return data.map(function(d) {
            d.incidentType = LookupService.incidentType.byId(d.incidentType).name;
            d.incidentAction = LookupService.incidentAction.byId(d.incidentAction).name;
            d.vesselType = LookupService.vesselType.byId(d.vesselType).name;
            d.vesselStatus = LookupService.vesselStatus.byId(d.vesselStatus).name;
            d.vesselCountry = LookupService.country.byId(d.vesselCountry).name;
            d.waterCountry = LookupService.country.byId(d.waterCountry).name;
            d.closestCountry = LookupService.country.byId(d.closestCountry).name;
            // d.timeOfDay = LookupService.timeOfDay.byId(d.timeOfDay).name;
            return d;
        });
    },

    /**
     * Converts the passed params object to a
     * Waterline ORM-friendly query filter.
     * @param  {object} params parameters from the HTTP request
     * @return {Object}        Waterline ORM-friendly query filter
     */     
    buildFilter: function(params) {
        var keys = Object.keys(Incident._attributes),
            filter = {};

        /**
         * initialize the filter object with the keys from the
         * incident model
         */
        for (i = 0; i < keys.length; i++) filter[keys[i]] = {};

        /**
         * initialize the filter object with id > -1
         */
        if (params.id === undefined) filter.id['>'] = -1;
        else filter.id = params.id;

        /**
         * date should be >= beginDate and <= endDate
         */
        if (params.beginDate !== undefined) filter.date['>='] = params.beginDate;
        if (params.endDate !== undefined) filter.date['<='] = params.endDate;

        /**
         * split timeOfDay, incidentType, incidentAction
         * closestCountry, waterCountry, vesselType, vesselCountry,
         * vesselStatus, violenceDummy into arrays
         */
        // if (params.timeOfDay !== undefined && params.timeOfDay.length > 0) filter.timeOfDay = params.timeOfDay.split(',');
        if (params.incidentType !== undefined && params.incidentType.length > 0) filter.incidentType = params.incidentType.split(',');
        if (params.incidentAction !== undefined && params.incidentAction.length > 0) filter.incidentAction = params.incidentAction.split(',');
        if (params.closestCountry !== undefined && params.closestCountry.length > 0) filter.closestCountry = params.closestCountry.split(',');
        if (params.waterCountry !== undefined && params.waterCountry.length > 0) filter.waterCountry = params.waterCountry.split(',');
        if (params.vesselType !== undefined && params.vesselType.length > 0) filter.vesselType = params.vesselType.split(',');
        if (params.vesselCountry !== undefined && params.vesselCountry.length > 0) filter.vesselCountry = params.vesselCountry.split(',');
        if (params.vesselStatus !== undefined && params.vesselStatus.length > 0) filter.vesselStatus = params.vesselStatus.split(',');
        if (params.violenceDummy !== undefined && params.violenceDummy.length > 0) filter.violenceDummy = params.violenceDummy.split(',');

        return filter;
    }
};
