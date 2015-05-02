/******************************************

FilterFormModel

Alex Klibisz, 2/21/15

This service handles all options and data 
manipulation for the event filter form.

******************************************/
mpmap.service('FilterFormModel', function(MapDataService) {

        function model() {
            this.dateRange = dateRange;
            this.locationInformation = locationInformation;
            this.vesselInformation = vesselInformation;
            this.incidentInformation = incidentInformation;
            this.getData = getData;
            getData();
        }

        function getData() {
            MapDataService.getCountries()
                .success(function(data) {
                    locationInformation.closestCountry.items = data;
                });
            MapDataService.getCountries()
                .success(function(data) {
                    locationInformation.waterCountry.items = data;
                });
            MapDataService.getCountries()
                .success(function(data) {
                    vesselInformation.vesselCountry.items = data;
                });
            MapDataService.getVesselTypes()
                .success(function(data) {
                    vesselInformation.vesselType.items = data;
                })
            MapDataService.getVesselStatuses()
                .success(function(data) {
                    vesselInformation.vesselStatus.items = data;
                })
            MapDataService.getIncidentTypes()
                .success(function(data) {
                    incidentInformation.incidentType.items = data;
                })
            MapDataService.getIncidentActions()
                .success(function(data) {
                    incidentInformation.incidentAction.items = data;
                })
        }

        function getFilter() {

        }

        var dateRange = {
            years: [],
            selectedYear: '',
            beginDate: {
                value: new Date(new Date().getFullYear() - 2, 0, 1),
                opened: false,
                format: 'MM/dd/yyyy'
            },
            endDate: {
                value: new Date(new Date().getFullYear(), 11, 31),
                opened: false,
                format: 'MM/dd/yyyy'
            },
            openDatePicker: function($event, dp) {
                $event.preventDefault();
                $event.stopPropagation();
                dp.opened = !dp.opened;
            }
        }

        var locationInformation = {
            closestCountry: {
                title: 'Closest Country',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            },
            waterCountry: {
                title: 'Territorial Water Status',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            }
        }

        var vesselInformation = {
            vesselCountry: {
                title: 'Vessel Country',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            },
            vesselStatus: {
                title: 'Vessel Status',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            },
            vesselType: {
                title: 'Vessel Type',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            }
        };

        var incidentInformation = {
            incidentType: {
                title: 'Incident Type',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            },
            incidentAction: {
                title: 'Incident Action',
                filterPlaceHolder: 'Start typing to filter the lists below.',
                labelAll: 'All',
                labelSelected: 'Selected',
                helpMessage: '',
                orderProperty: 'name',
                items: [],
                selected: []
            }
        };

        return model;
    })
    //Need this to make the begin date, end date calendars work correctly.
    //https://github.com/angular-ui/bootstrap/issues/2659
    .directive('datepickerPopup', function() {
        return {
            restrict: 'EAC',
            require: 'ngModel',
            link: function(scope, element, attr, controller) {
                controller.$formatters.shift();
            }
        };
    });