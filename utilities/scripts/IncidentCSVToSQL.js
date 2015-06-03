/**
 * Convert a csv spreadsheet of incidents to an equivalent
 * set of SQL statements using the incident model.
 */

var CSVHelper = require('../helpers/CSVHelper.js'),
    DataHelper = require('../helpers/DataHelper.js'),
    LookupService = require("../../api/services/LookupService.js"),
    moment = require('moment');

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

        // Year, month, day must be valid numbers
        var y = parseInt(row.year),
            m = parseInt(row.month),
            d = parseInt(row.day);

        if(checkDate(row.year, row.month, row.day)) {
            return escapeString([y, m, d].join('-'));    
        } else {
            return false;
        }

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

function checkDate(year, month, day) {

    var emptyString = (year.toString().length > 0) && (month.toString().length > 0) && (day.toString().length > 0),
        validRange = (parseInt(year) > 0 && parseInt(year) < new Date().getFullYear())

    var y = parseInt(year),
        m = parseInt(month),
        d = parseInt(day),
        maxYear = new Date().getFullYear(),
        maxMonth = 12,
        maxDay = 31;

    // all non-empty strings
    var nonEmpty = (y.toString().length > 0) && (m.toString().length > 0) && (d.toString().length > 0);

    // all numbers
    var allNumbers = !isNaN(y) && !isNaN(m) && !isNaN(d);

    // correct range
    var correctRange = (y > 0) && (y <= maxYear) && (m > 0) && (m <= maxMonth) && (d > 0) && (d <= maxDay);
    
    return allNumbers && nonEmpty && correctRange;

}