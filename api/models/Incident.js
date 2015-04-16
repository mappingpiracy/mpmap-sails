/**
 * Incident.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            index: true
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
            type: 'string'
        },

        waterCountry: {
            type: 'string'
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
