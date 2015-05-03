mpmap.service('AnalysisDataService',
    function($http) {

        /**
         * Public functions and variables
         * @type {object}
         */
        var service = {
            incidentsPerYear: [],
            getIncidentsPerYear: getIncidentsPerYear
        };

        return service;

        function getIncidentsPerYear(params) {
            var beginDate = params.beginDate,
                endDate = params.endDate,
                countries = params.closestCountry,
                limit = countries.length;

            if (countries.length === 0) {
                countries = 0;
                limit = 10;
            }

            return $http.get(`/analysis/incidentsperyear/${beginDate}/${endDate}/${countries}/${limit}`)
                .success(function(data, status, headers, config) {
                    service.incidentsPerYear = data;
                });
        }
    }
);
