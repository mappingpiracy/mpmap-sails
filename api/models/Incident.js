/**
 * Incident.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    migrate: 'safe',

    attributes: {

        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },

        referenceId: {
            type: 'integer'
        },

        datetime: {
            type: 'datetime'
        },

        timeOfDay: {
            type: 'integer'
        },

        incidentType: {
            type: 'integer'
        },

        incidentAction: {
            type: 'integer'
        },

        latitude: {
            type: 'float'
        },

        longitude: {
            type: 'float'
        },

        closestCountry: {
            type: 'integer'
        },

        waterCountry: {
            type: 'integer'
        },

        locationDescription: {
            type: 'string'
        },

        vesselName: {
            type: 'string'
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
         * datetime should be >= beginDate and <= endDate
         */
        if (params.beginDate !== undefined) filter.datetime['>='] = params.beginDate;
        if (params.endDate !== undefined) filter.datetime['<='] = params.endDate;

        /**
         * separate timeOfDay, incidentType, incidentAction
         * closestCountry, waterCountry, vesselType, vesselCountry,
         * vesselStatus, violenceDummy into arrays
         */
        if (params.timeOfDay !== undefined) filter.timeOfDay = params.timeOfDay.split(',');
        if (params.incidentType !== undefined) filter.incidentType = params.incidentType.split(',');
        if (params.incidentAction !== undefined) filter.incidentAction = params.incidentAction.split(',');
        if (params.closestCountry !== undefined) filter.closestCountry = params.closestCountry.split(',');
        if (params.waterCountry !== undefined) filter.waterCountry = params.waterCountry.split(',');
        if (params.vesselType !== undefined) filter.vesselType = params.vesselType.split(',');
        if (params.vesselCountry !== undefined) filter.vesselCountry = params.vesselCountry.split(',');
        if (params.vesselStatus !== undefined) filter.vesselStatus = params.vesselStatus.split(',');
        if (params.violenceDummy !== undefined) filter.violenceDummy = params.violenceDummy.split(',');

        return filter;
    }
};
