/**
 * VesselType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'vessel_type',
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
            enum: ['LNG, LPG, or Oil Tanker',
                'Chemical Tanker',
                'Tanker or Produce Tanker',
                'General Cargo',
                'Barge or Tug',
                'Fishing Boat, Trawler, or Vessel',
                'Yacht, Leisure Craft, or Passenger Ship',
                'Carrier'
            ]
        }
    }
};
