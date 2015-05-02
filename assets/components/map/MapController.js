/**
 * MapController
 *
 * Alex Klibisz, 1/16/15
 *
 * This controller handles all data loading and passing for the map view.
 */
mpmap.controller('MapController',
    function($scope, $location, $document, $modal,
        MapDataService, ExportDataService, LeafletMapModel, FilterFormModel, IncidentsPerYearModel, GenericModalModel, IncidentStatisticsModel) {

        /*
        Declare all public functions and variables.
         */
        $scope.initialize = initialize; /* called from bottom of controller */
        $scope.filterForm = new FilterFormModel(); /* model data for filter form */
        $scope.map = new LeafletMapModel(); /* map implemented with leaflet */
        $scope.incidentStatistics = new IncidentStatisticsModel(); /* statistics about the returned data */
        $scope.exportIncidents = exportIncidents;
        $scope.analysis = analysis;
        $scope.modal = new GenericModalModel(); /* handles all modals */

        /**
         * Load the incident data, load incident statistics, display modals.
         * @return {[type]} [description]
         */
        function initialize() {
            $scope.modal.open("Events loading, please wait.");
            MapDataService.getIncidents($scope.filterForm.getFilter(), 'geojson')
                .success(function(data, status) {
                    $scope.map.setGeoJsonData(data);
                    $scope.incidentStatistics.setData(data);
                })
                .error(function(data, status) {
                    $scope.modal.open("Error loading events.", status);
                    console.error(status);
                })
                .then(function() {
                    $scope.modal.close();
                });
        };

        function exportIncidents(format) {
            if (format === 'geojson') {
                var data = $scope.map.geoJson;
                ExportDataService.exportFile(data, format);
            } else if (format === 'json') {
                MapDataService.getIncidents($scope.filterForm.getFilter(), format)
                .success(function(data, status) {
                  ExportDataService.exportFile(data, format);
                });
            } else if (format === 'csv') {
                MapDataService.getIncidents($scope.filterForm.getFilter(), format)
                .success(function(data, status) {
                  ExportDataService.exportFile(data, format);
                });
            }
        }

        function exportFilters(format) {
            ExportDataService.exportFile($scope.filterForm.getFilter(), format);
        }

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
