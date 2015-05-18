/**
 * Convert a csv spreadsheet of incidents to an equivalent
 * set of SQL statements using the incident model.
 */

var Incident = require('../../api/models/Incident.js');
	attributes = Incident.attributes,
	CSVHelper = require('../helpers/CSVHelper.js');



var argv = process.argv;
	fileName = argv[2];

CSVHelper.csvToJSON(fileName, function(data) {
	console.log(data);
})

