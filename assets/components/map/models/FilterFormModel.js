/******************************************

FilterFormModel

Alex Klibisz, 2/21/15

This service handles all options and data 
manipulation for the event filter form.

******************************************/
mpmap.service('FilterFormModel', function(MapDataService) {
        return function() {

            this.dateRange = {
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
            };

            this.locationInformation = {
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
            };

            this.vesselInformation = {
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

            this.conflictInformation = {
            	type: {
					title: 'Incident Type',
					filterPlaceHolder: 'Start typing to filter the lists below.',
					labelAll: 'All',
					labelSelected: 'Selected',
					helpMessage: '',
					orderProperty: 'name',
					items: [],
					selected: []
				}, 
				action: {
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

            getData();

            function getData() {
                console.log('getData called');
            }

            function getFilter() {
            	
            }
        }
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
