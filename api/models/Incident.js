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
    }
};
