mpmap.service('ExportDataService', function($rootScope) {

  var exportData = {

    /*
      Generic export function creates a file of the given 
      format containing the given data.
      */
      export: function(data, format) {
        var fileName, fileContents, fileType, blob;

        fileName = 'mpmap_export_' + new Date().toString('yyyy-MM-dd-HH:mm:ss') + '.' + format;
        
        if (format.indexOf('json') > -1) {
          fileContents = JSON.stringify(data);
          fileType = 'application/json;';
        } else if (format.indexOf('csv') > -1) {
          fileContents = data;
          fileType = 'text/csv;';
        }

        blob = new Blob([fileContents], {
          type: fileType + 'charset=utf-8;'
        });

        saveAs(blob, fileName);
      },

      /*
          mapdata-specific conversion from geoJson features to CSV

          - works by loading data into row array, then pushing the row array as a
          comma-separated list to the body array.
          - initialize the column headings as the first row
          - then iterate over the geojson features list to get the corresponding 
          column values
          - return the body list as a string with fields separated by new line characters
      */
      geoJsonFeaturesToCSV: function(data) {
          var key, value, columns = [], row = [], body = [], features;
          
          //get the feature list
          features = data.data.features;

          //check the length and return empty list if 0
          if(features.length === 0) return [];
        
          //initialize the column headings and push them to the body
          for(key in features[0].properties) {
            columns.push(key);
          }
          body.push(columns.join(','));
          
          for(var i = 0; i < features.length; i++) {
            for(key in columns) {
              value = features[i].properties[columns[key]];
              row.push('"' + value + '"');//surround the value in quotes to escape any commas
            }
            body.push(row.join(','));
            row = [];
          }          

          //return the body list
          return body.join('\n');
        }

    };

    return exportData;

  });