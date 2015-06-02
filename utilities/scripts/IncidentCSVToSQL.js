/**
 * Convert a csv spreadsheet of incidents to an equivalent
 * set of SQL statements using the incident model.
 */

var CSVHelper = require('../helpers/CSVHelper.js'),
    DataHelper = require('../helpers/DataHelper.js'),
    LookupService = require("../../api/services/LookupService.js");

/**
 * Arguments
 */
var argv = process.argv,
    fileName = argv[2];

/**
 * Lookup Objects
 */
var country = LookupService.country.all(),
    incidentAction = LookupService.incidentAction.all(),
    incidentAction = LookupService.incidentAction.all(),
    incidentType = LookupService.incidentType.all(),
    vesselType = LookupService.vesselType.all(),
    vesselStatus = LookupService.vesselStatus.all(),
    timeOfDay = LookupService.timeOfDay.all();


var table = 'incident';
var dbMap = {
    referenceId: function(row) {
        return row.id;
    },
    date: function(row) {
        var date = [row.year, row.month, row.day].join('-');
        return escapeString(date);
    },
    time: function(row) {
        return escapeString(row.time);
    },
    timeRecode: function(row) {
        return DataHelper.findInArray(timeOfDay, row.time_recode, 'name', 'id', -99);
    },
    incidentType: function(row) {
        return DataHelper.findInArray(incidentType, row.incidentType, 'name', 'id', -99);
    },
    incidentAction: function(row) {
        return DataHelper.findInArray(incidentAction, row.incidentAction, 'name', 'id', -99);
    },
    latitude: function(row) {

        // latitude must be a number between -90 and 90
        var lat = parseFloat(row.latitude);
        return (Math.abs(lat) <= 90) ? lat : false;

    },
    longitude: function(row) {

        // longitude must be anumber between -180 and 180
        var lng = parseFloat(row.longitude);
        return (Math.abs(lng) <= 180) ? lng : false;

    },
    geolocationSource: function(row) {
        return escapeString(row.geolocation_source);
    },
    closestCountry: function(row) {
        return DataHelper.findInArray(country, row.closest_coastal_state, 'name', 'id', 0);
    },
    waterCountry: function(row) {
        return DataHelper.findInArray(country, row.territorial_water_status, 'name', 'id', 0);
    },
    locationDescription: function(row) {
        return escapeString(row.location_description);
    },
    vesselName: function(row) {
        return escapeString(row.vessel_name);
    },
    vesselType: function(row) {
        return DataHelper.findInArray(vesselType, row.vessel_type, 'id', 'id', -99);
    },
    vesselCountry: function(row) {
        return DataHelper.findInArray(country, row.vessel_country, 'name', 'id', -99);
    },
    vesselStatus: function(row) {
        return DataHelper.findInArray(vesselStatus, row.vessel_status, 'name', 'id', -99);
    },
    violenceDummy: function(row) {
        var vd = row.violence_dummy;
        if (vd === 't' || vd === '1') return 1;
        else if (vd === 'f' || vd === '0') return 0;
        else return 'NULL';
    }
};
var dbColumns = Object.keys(dbMap);

CSVHelper.csvToJSON(fileName, function(data) {
    var values = [],
        statement,
        evaluated,
        error;
    data.forEach(function(row, index) {

        error = false;

        values = dbColumns.map(function(col) {
            evaluated = dbMap[col](row);
            if (evaluated === false) error = true;
            return evaluated;
        });

        if (error) {
            console.error('Error at line ' + index);
        } else {
            statement = insertStatement(table, dbColumns, values);
            console.log(statement);
        }


    })
})

/**
 * Create an insert statement into the passed table using
 * the passed columns and values.
 */
function insertStatement(table, columns, values) {
    return 'INSERT INTO ' + table + '(' + columns.join(',') + ') VALUES (' + values.join(',') + ');';
}

/**
 * Make a string SQL-friendly
 */
function escapeString(s) {
    if (s === null || s === undefined) return 'NULL';
    s = s.toString();
    s = s.replace(/'/g, "''");
    s = s.replace(/"/g, '""');
    s = '\'' + s + '\'';
    return s;
}
