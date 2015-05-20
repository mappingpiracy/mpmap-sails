/**
 * Incident.js
 *
 * @description :: Incident Class. Also contains a buildFilter function that
 * returns a waterline filter based on passed parameters.
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
            type: 'integer',
            unique: true,
            notNull: true
        },

        date: {
            type: 'date',
            notNull: true
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
            type: 'float',
            notNull: true
        },

        longitude: {
            type: 'float',
            notNull: true
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
        if (params.timeOfDay !== undefined && params.timeOfDay.length > 0) filter.timeOfDay = params.timeOfDay.split(',');
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
