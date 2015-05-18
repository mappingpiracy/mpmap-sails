/**
 * ConversionControllerController
 *
 * @description :: Server-side logic for managing Conversioncontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var https = require('https');
var urls = {
    google: {
        mpmapMaster: 'https://docs.google.com/spreadsheets/d/1XnORzoDqDYpYeqL30XcznKAFyqS-sTxKBH_bMVeU3ZU/export?format=csv'
    }
}

module.exports = {

    GoogleToSQL: function(req, res) {
        var url = urls.google.mpmapMaster;

        https.get(url, function(response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
            response.on('data', function(data) {
                process.stdout.write('line', data);
            })
        });
        res.send(csvData);
    }

};
