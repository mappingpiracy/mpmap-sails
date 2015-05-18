var CsvToJson = require('csvtojson'),
    Converter = CsvToJson.core.Converter,
    Json2Csv = require('json2csv'),
    fs = require('fs');

module.exports = {

    csvToJSON: function(fileName, callback) {
        var fileStream = fs.createReadStream(fileName),
            csvConverter = new Converter({
                constructResult: true
            });
        fileStream.pipe(csvConverter);
        csvConverter.on('end_parsed', function(jsonObj) {
            callback(jsonObj);
        });
    }

}
