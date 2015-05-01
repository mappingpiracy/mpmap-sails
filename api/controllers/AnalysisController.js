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
            country, year, incidents, filter;

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
                var c = data.map(function(c) {
                    return c.closestCountry;
                });
                var m = new Map();
                m.putArray(c);
                console.log(m);
                return res.json(data);
            });


        // for (country in countries) {
        //     country = lookup.country[countries[country]];
        //     for(year = beginYear.getFullYear(); year <= endYear.getFullYear(); year++) {
        //        filter = Incident.buildFilter({
        //           'closestCountry': country.id,
        //           'beginDate': new Date(year, 0, 1),
        //           'endDate': new Date(year, 11, 31)
        //        });
        //        console.log(year);
        //        // Incident.find(filter).exec(function(err, data) {
        //        //    console.log(country.id, year, data.length);
        //        // })
        //     }
        // }

        // return res.json({
        //     todo: 'index() is not implemented yet!'
        // });
    }
};
