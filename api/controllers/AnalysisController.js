/**
 * AnalysisController
 *
 * @description :: Server-side logic for managing analyses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var LookUp = require('../data/LookUp.js'),
    Map = require('../lib/Map.js'),
    lookup = new LookUp();

module.exports = {

    /**
     * `AnalysisController.index()`
     */
    index: function(req, res) {
        return res.json({
            todo: 'index() is not implemented yet!'
        });
    },


    /**
     * `AnalysisController.IncidentsPerYear()`
     *
     * Find the number of incidents for the countries from beginYear to endYear
     * Return an array of objects as follows:
     * [{key: country name, values: '{x: year, y: number of incidents }'}]
     * If the countries parameter is 0, return the top limit countries in descending order.
     * 
     */
    incidentsPerYear: function(req, res) {
        var params = req.params.all(),
            beginDate = params['beginDate'],
            endDate = params['endDate'],
            countries = params['countries'],
            limit = params['limit'],
            analysisCountries = new Map(),
            analysisData = [];

        if (countries === '0') {
            countries = undefined;
        }

        filter = Incident.buildFilter({
            'closestCountry': countries,
            'beginDate': new Date(beginDate),
            'endDate': new Date(endDate)
        });

        Incident.find(filter)
            .exec(function(err, data) {
                data.map(function(d) {
                    var countryName = lookup.country[d.closestCountry].name,
                        year = d.datetime.getFullYear(),
                        country = analysisCountries.find(countryName);
                    if(country === null) {
                        country = analysisCountries.put(countryName, new Map());
                    }
                    var yearSum = country.find(year);
                    if(yearSum === null) {
                        yearSum = country.put(year, 0);
                    }
                    country.put(year, yearSum+1);
                });

                


                return res.json(analysisData);
            });

    }
};
