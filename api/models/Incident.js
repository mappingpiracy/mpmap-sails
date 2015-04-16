/**
 * Incident.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

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
            type: 'integer'
        },

        datetime: {
            type: 'datetime'
        },

        timeOfDay: {
            type: 'string'
        },

        type: {
            type: 'string'
        },

        action: {
            type: 'string'
        },

        latitude: {
            type: 'float'
        },

        longitude: {
            type: 'float'
        },

        closestCountry: {
            model: 'Country'
        },

        waterCountry: {
            model: 'Country'
        },

        locationDescription: {
            type: 'string'
        },

        vesselName: {
            type: 'string'
        },

        vesselType: {
            type: 'string'
        },

        vesselCountry: {
            type: 'string'
        },

        vesselStatus: {
            type: 'string'
        },

        violenceDummy: {
            type: 'boolean'
        }
    }
};
