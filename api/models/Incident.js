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
            type: 'string'
        },

        incidentType: {
            type: 'integer'
            // model: 'IncidentType'
        },

        incidentAction: {
            type: 'integer'
            // model: 'IncidentAction'
        },

        latitude: {
            type: 'float'
        },

        longitude: {
            type: 'float'
        },

        closestCountry: {
            type: 'integer'
            // model: 'Country'
        },

        waterCountry: {
            type: 'integer'
            // model: 'Country'
        },

        locationDescription: {
            type: 'string'
        },

        vesselName: {
            type: 'string'
        },

        vesselType: {
            type: 'integer'
            // model: 'VesselType'
        },

        vesselCountry: {
            type: 'integer'
            // model: 'Country'
        },

        vesselStatus: {
            model: 'VesselStatus'
        },

        violenceDummy: {
            type: 'boolean'
        }
    }
};
