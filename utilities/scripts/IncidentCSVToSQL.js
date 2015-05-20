/**
 * Convert a csv spreadsheet of incidents to an equivalent
 * set of SQL statements using the incident model.
 */

var CSVHelper = require('../helpers/CSVHelper.js'),
    DataHelper = require('../helpers/DataHelper.js'),
    LookupService = require("../../api/services/LookupService.js");

var argv = process.argv,
    fileName = argv[2];

var country = LookupService.country.all(),
    incidentAction = LookupService.incidentAction.all(),
    incidentAction = LookupService.incidentAction.all(),
    incidentType = LookupService.incidentType.all(),
    vesselType = LookupService.vesselType.all(),
    vesselStatus = LookupService.vesselStatus.all(),
    timeOfDay = LookupService.timeOfDay.all();

var table = 'incident',
    dbMap = {
        referenceId: function(row) {
            return row.referenceId;
        },
        date: function(row) {
            var d = new Date(row.datetime);
            d = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
            return escapeString(d);
        },
        timeOfDay: function(row) {
            return DataHelper.findInArray(timeOfDay, row.timeOfDay, 'name', 'id', 'NULL');
        },
        incidentType: function(row) {
            return DataHelper.findInArray(incidentType, row.incidentType, 'name', 'id', -99);
        },
        incidentAction: function(row) {
            return DataHelper.findInArray(incidentAction, row.incidentAction, 'name', 'id', -99);
        },
        latitude: function(row) {
            return row.latitude;
        },
        longitude: function(row) {
            return row.longitude;
        },
        closestCountry: function(row) {
            return DataHelper.findInArray(country, row.closestCountry, 'name', 'id', 0);
        },
        waterCountry: function(row) {
            return DataHelper.findInArray(country, row.waterCountry, 'name', 'id', 0);
        },
        locationDescription: function(row) {
        	return escapeString(row.locationDescription);
        },
        vesselName: function(row) {
        	return escapeString(row.vesselName);
        },
        vesselType: function(row) {
        	return DataHelper.findInArray(vesselType, row.vesselType, 'name', 'id', -99);
        },
        vesselCountry: function(row) {
        	return DataHelper.findInArray(country, row.vesselCountry, 'name', 'id', -99);
        },
        vesselStatus: function(row) {
        	return DataHelper.findInArray(vesselStatus, row.vesselStatus, 'name', 'id', -99);
        },
        violenceDummy: function(row) {
        	var vd = row.violenceDummy;
        	if(vd === 't') return 1;
        	else if(vd === 'f') return 0;
        	else return 'NULL';
        }
    },
    dbColumns = Object.keys(dbMap);

CSVHelper.csvToJSON(fileName, function(data) {
    var values = [],
        statement;
    data.forEach(function(row) {
        values = dbColumns.map(function(col) {
            return dbMap[col](row);
        });
        statement = insertStatement(table, dbColumns, values);
        console.log(statement);
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
    if (s === null) return 'NULL';
    s = s.toString();
    s = s.replace(/'/g, "''");
    s = s.replace(/"/g, '""');
    s = '\'' + s + '\'';
    return s;
}
