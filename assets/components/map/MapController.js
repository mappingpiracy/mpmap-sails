/******************************************

MapController

Alex Klibisz, 1/16/15

 ******************************************/

mpmap.controller('MapController',
  function($scope, $location, $document, $modal,
    MapDataService, ExportDataService,
    LeafletMapModel, FilterFormModel, IncidentsPerYearModel, GenericModalModel, IncidentStatisticsModel) {

    /******************************************
    
    Initialization function to pull in all
    necessary data for the controller.

    Called at the end of the controller.

    ******************************************/

    $scope.initialize = function() {
      //Populate the filter form
      $scope.filterForm.getData();
      //Open a loading modal and get the map geojson data
      $scope.modal.open($scope.messages.events.loading);
      MapDataService.getIncidents($scope.filterForm.getFilter(), 'geojson')
        .success(function(data, status) {
          //call the map model constructor with the returned data
          LeafletMapModel(data);
          IncidentStatisticsModel(data.features);
          $scope.analysis.initialize();
        })
        .error(function(data, status) {
          $scope.modal.open($scope.messages.events.error);
        })
        .then(function() {
          //get the analysis data
          $scope.modal.close();
        });
    };

    /******************************************

    Messages object - contains all help, error,
    etc. messages

     ******************************************/

    $scope.messages = {
      help: {
        multiSelect: "Use the search field to filter the \"All\" column. Transfer items from the \"All\" column to the selected column by clicking on them.",
      },
      placeHolder: {
        multiSelectSearch: "Search and select by country name."
      },
      events: {
        loading: 'Events loading. Please wait.',
        error: "Error loading events."
      }
    };

    /******************************************

    Modals object - handles all modals for the
    map view.

     ******************************************/

    $scope.modal = new GenericModalModel();

    /******************************************

    Filter Form object - contains all data and
    functionality for the event filter form

     ******************************************/

    $scope.filterForm = new FilterFormModel();

    /******************************************

    Map object - contains all data and functions for
    the main map (div id "map")

     ******************************************/

    $scope.map = new LeafletMapModel();

    /******************************************

    Export object - calls export functionality
    for filters and events.

     ******************************************/
    $scope.export = {

      incidents: function(format) {
        //export the geojson as is
        if (format == 'geojson') {
          ExportDataService.export($scope.map.geojson, format);
        }
        //get the feature list from the geojson object, convert it to csv, then export
        else if (format == 'csv') {
          ExportDataService.export(ExportDataService.geoJsonFeaturesToCSV($scope.map.geojson), format);
        }
      },
      filters: function(format) {
        ExportDataService.export($scope.filterForm.getFilter(), format);
      }
    };

    /******************************************

    Statistics object - contains all models
    for the d3 and nv.d3 data visualizations.

    ******************************************/    

    $scope.incidentStatistics = new IncidentStatisticsModel();

    /******************************************

    Analysis object - contains all models
    for the d3 and nv.d3 data visualizations.

    ******************************************/

    $scope.analysis = {
      models: {
        eventsPerYear: IncidentsPerYearModel()
      },
      initialize: function() {
        var countries = [], countryCount;
        
        if($scope.filterForm.fields.locationInformation.closestCountry.selected.length > 0) {
          countries = $scope.filterForm.fields.locationInformation.closestCountry.selected;
          countryCount = countries.length;
        } else {
          countries = $scope.filterForm.fields.locationInformation.closestCountry.items;
          countryCount = 10;
        }

        IncidentsPerYearModel($scope.map.geojson,
          countries,
          countryCount,
          $scope.filterForm.fields.dateRange.beginDate.value,
          $scope.filterForm.fields.dateRange.endDate.value);
      }
    };

    /******************************************

    Initialization: call the primary initialize
    function.

     ******************************************/
    $scope.initialize();
  }
); //  MapController