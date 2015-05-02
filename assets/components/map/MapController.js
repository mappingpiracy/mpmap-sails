/**
 * MapController
 *
 * Alex Klibisz, 1/16/15
 *
 * This controller handles all data loading and passing for the map view.
 */
mpmap.controller('MapController',
    function($scope, $location, $document, $modal,
        MapDataService, ExportDataService,
        LeafletMapModel, FilterFormModel, IncidentsPerYearModel, GenericModalModel, IncidentStatisticsModel) {


        /*
        Declare all public functions and variables.
         */
        $scope.initialize = initialize; /* called from bottom of controller */
        $scope.modal = new GenericModalModel(); /* handles all modals */
        $scope.filterForm = new FilterFormModel(); /* model data for filter form */
        $scope.map = new LeafletMapModel(); /* map implemented with leaflet */
        $scope.incidentStatistics = new IncidentStatisticsModel(); /* statistics about the returned data */
        $scope.export = exports; /* data exporting functionality */
        $scope.analysis = analysis;


        function initialize() {
            console.log($scope.filterForm.getFilter());
            MapDataService.getIncidents($scope.filterForm.getFilter(), 'geojson')
                .success(function(data, status) {
                    console.log(data);
                });

            // //Open a loading modal and get the map geojson data
            // $scope.modal.open($scope.messages.events.loading);
            // MapDataService.getIncidents($scope.filterForm.getFilter(), 'geojson')
            //   .success(function(data, status) {
            //     //call the map model constructor with the returned data
            //     LeafletMapModel(data);
            //     IncidentStatisticsModel(data.features);
            //     $scope.analysis.initialize();
            //   })
            //   .error(function(data, status) {
            //     $scope.modal.open($scope.messages.events.error);
            //   })
            //   .then(function() {
            //     //get the analysis data
            //     $scope.modal.close();
            //   });
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

        Export object - calls export functionality
        for filters and events.

         ******************************************/
        var exports = {

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

        var analysis = {
            models: {
                eventsPerYear: IncidentsPerYearModel()
            },
            initialize: function() {
                var countries = [],
                    countryCount;

                if ($scope.filterForm.fields.locationInformation.closestCountry.selected.length > 0) {
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

        initialize();
    }
); //  MapController
