mpmap.service('MapDataService',
    function($rootScope, $location, $http) {

        var service = {
            incidents: [],
            getIncidents: getIncidents,
            countries: [],
            getCountries: getCountries,
            dateRange: [],
            getDateRange: getDateRange,
            incidentActions: [],
            getIncidentActions: getIncidentActions,
            incidentTypes: [],
            getIncidentTypes: getIncidentTypes,
            vesselTypes: [],
            getVesselTypes: getVesselTypes,
            vesselStatuses: [],
            getVesselStatuses: getVesselStatuses
        };

        return service;

        function getIncidents(params, format) {
            return $http.get('/geodata/incident/' + format, {
                    params: params
                })
                .success(function(data, status, headers, config) {
                    service.incidents = data;
                });
        }

        function getDateRange() {
            return $http.get('/geodata/daterange/')
                .success(function(data, status, headers, config) {
                    service.dateRange = data;
                });
        }

        function getCountries(id = '') {
            return $http.get('/geodata/country/' + id, {})
                .success(function(data, status, headers, config) {
                    service.countries = data;
                });
        }

        function getIncidentActions(id = '') {
            return $http.get('/geodata/incidentaction/' + id, {})
                .success(function(data, status, headers, config) {
                    service.countries = data;
                });
        }

        function getIncidentTypes(id = '') {
            return $http.get('/geodata/incidenttype/' + id, {})
                .success(function(data, status, headers, config) {
                    service.countries = data;
                });
        }

        function getVesselTypes(id = '') {
            return $http.get('/geodata/vesseltype/' + id, {})
                .success(function(data, status, headers, config) {
                    service.countries = data;
                });
        }

        function getVesselStatuses(id = '') {
            return $http.get('/geodata/vesselstatus/' + id, {})
                .success(function(data, status, headers, config) {
                    service.countries = data;
                });
        }


        // var mapData = {

        //   getIncidents: function(filter, format) {
        //     filter.format = format;
        //     return $http.get('/incident/geojson?beginDate=2015-01-01&endDate=2015-05-15', {
        //       //params: filter
        //     });
        //   },

        //   /*
        //       return the list of countries
        //   */
        //   getCountries: function() {
        //     return $http.get('/country');
        //   },

        //   /*
        //       return the years from this year back to 1992 - TODO: abstract this to an API call
        //   */
        //   getYears: function() {
        //     var years = [];
        //     for (var i = new Date().getFullYear(); i > 1992; i--) years.push(i);
        //     return years;
        //   },

        //   /*
        //       return the list of vessel statuses - TODO: abstract this to an API call
        //   */
        //   getVesselStatus: function() {
        //     return [{"id": "Anchored", "name": "Anchored"}, {"id": "Berthed", "name": "Berthed"}, {"id": "Moored", "name": "Moored"}, {"id": "Stationary", "name": "Stationary"}];
        //   },

        //   getVesselType: function() {
        //     return [{"id": "Barge or Tug", "name": "Barge or Tug"}, {"id": "Carrier", "name": "Chemical Tanker"}, {"id": "Container Ship", "name": "Container Ship"}, {"id": "Fishing Boat", "name": "Fishing Boat, Trawler or Vessel"}, {"id": "General Cargo", "name": "Fishing Boat, Trawler or Vessel"}, {"id": "LNG, LPG, or Oil Tanker", "name": "LNG, LPG, or Oil Tanker"}, {"id": "Tanker or Produce Tanker", "name": "Tanker or Produce Tanker"}, {"id": "Yacht, Leisure Craft, or Passenger Ship", "name": "Yacht, Leisure Craft, or Passenger Ship"}];
        //   },

        //   getConflictType: function() {
        //     return [{"id": "Actual", "name": "Actual"}, {"id": "Attempted", "name": "Attempted"}];
        //   },

        //   getConflictAction: function() {
        //     return [{"id": "Boarded", "name": "Boarded"}, {"id": "Detaining", "name": "Detaining"}, {"id": "Missing", "name": "Missing"}, {"id": "Fired Upon", "name": "Fired Upon"}, {"id": "Hijacked", "name": "Hijacked"}];
        //   }

        // };

        // return mapData;

    }
);