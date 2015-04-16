/**
 * Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    migrate: "safe",

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            index: true
        },

        cowId: {
            type: 'integer'
        },

        name: {
            type: 'string'
        },

        shortName: {
            type: 'string'
        }
    }
};
