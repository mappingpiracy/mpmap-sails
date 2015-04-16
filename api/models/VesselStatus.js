/**
 * VesselStatus.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'vessel_status',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    migrate: 'alter',

    attributes: {

        id: {
            type: 'integer',
            unique: true,
            index: true,
            primaryKey: true,
        },

        name: {
            type: 'string',
            enum: ['Anchored',
                'Berthed',
                'Steaming'
            ]
        }
    }
};
