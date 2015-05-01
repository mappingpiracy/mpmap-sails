mpmap.service('MapDataService',
  function($rootScope, $location, $http) {

    var mapData = {

      getIncidents: function(filter, format) {
        filter.format = format;
        console.log("API call with filter: ", filter);
        return $http.get('/mapdata/incidents', {
          params: filter
        });
      },

      /*
          return the list of countries
      */
      getCountries: function() {
        return $http.get('/mapdata/countries');
      },

      /*
          return the years from this year back to 1992 - TODO: abstract this to an API call
      */
      getYears: function() {
        var years = [];
        for (var i = new Date().getFullYear(); i > 1992; i--) years.push(i);
        return years;
      },

      /*
          return the list of vessel statuses - TODO: abstract this to an API call
      */
      getVesselStatus: function() {
        return [{"id": "Anchored", "name": "Anchored"}, {"id": "Berthed", "name": "Berthed"}, {"id": "Moored", "name": "Moored"}, {"id": "Stationary", "name": "Stationary"}];
      },

      getVesselType: function() {
        return [{"id": "Barge or Tug", "name": "Barge or Tug"}, {"id": "Carrier", "name": "Chemical Tanker"}, {"id": "Container Ship", "name": "Container Ship"}, {"id": "Fishing Boat", "name": "Fishing Boat, Trawler or Vessel"}, {"id": "General Cargo", "name": "Fishing Boat, Trawler or Vessel"}, {"id": "LNG, LPG, or Oil Tanker", "name": "LNG, LPG, or Oil Tanker"}, {"id": "Tanker or Produce Tanker", "name": "Tanker or Produce Tanker"}, {"id": "Yacht, Leisure Craft, or Passenger Ship", "name": "Yacht, Leisure Craft, or Passenger Ship"}];
      },

      getConflictType: function() {
        return [{"id": "Actual", "name": "Actual"}, {"id": "Attempted", "name": "Attempted"}];
      },

      getConflictAction: function() {
        return [{"id": "Boarded", "name": "Boarded"}, {"id": "Detaining", "name": "Detaining"}, {"id": "Missing", "name": "Missing"}, {"id": "Fired Upon", "name": "Fired Upon"}, {"id": "Hijacked", "name": "Hijacked"}];
      }

    };

    return mapData;

  }
);