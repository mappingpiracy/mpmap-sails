/******************************************

IncidentsPerYearModel

Alex Klibisz, 2/18/15

This service handles all options and data manipulation for the events per year nvD3 line chart.

It is initialized via the final return function with a passed list of events in geojson form.

******************************************/

mpmap.service('IncidentsPerYearModel', function($rootScope) {
    var model = {
        options: {
            chart: {
                type: 'lineChart',
                height: 240,
                margin: {
                    top: 20,
                    right: 60,
                    bottom: 40,
                    left: 55
                },
                x: function(d) {
                    return d.x;
                },
                y: function(d) {
                    return d.y;
                },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e) { /* console.log("stateChange"); */ },
                    changeState: function(e) { /* console.log("changeState"); */ },
                    tooltipShow: function(e) { /* console.log("tooltipShow"); */ },
                    tooltipHide: function(e) { /* console.log("tooltipHide"); */ }
                },
                xAxis: {
                    axisLabel: 'Years',
                    tickValues: []
                },
                yAxis: {
                    axisLabel: 'Events',
                    axisLabelDistance: 30
                },
                callback: function(chart) { /* console.log("!!! lineChart callback !!!"); */ }
            }
        }
    };

    /*
    Create an nvD3 line chart-friendly representation of the passed mapData.
    Returns 'returnSize' countries to be displayed on the graph.
    3-step process:
    1) Construct an object uniqueCountries functioning as a map with
        - key: country name
        - val:
            - key: year
            - val: number of events
    2) Transfer the keys (country names) from the uniqueCountries to an array, sortedCountries.
    Sort the country names by the sum of their incidents in descending order
    using the .sort(function() {...}) custom sort
    3) Iterate over the first 'returnSize' elements of this array, retrieving the country's value
    from the uniqueCountries object to get the sum of incidents for that country. 
    Transcribe this object to the chartData array matching the form:
        Array: [
            Object: {
                key: country name,
                values: Array: {
                    Object: {
                        x: year,
                        y: number of events for that year
                    }
                }   
            }
        ]
     */

    function getData(features, countries, returnSize, beginYear, endYear) {
        console.log(countries);
        var years = {},
            uniqueCountries = {},
            sortedCountries = [],
            chartData = [],
            values = [],
            country, year, i, j;

        //create an object with a key for every country and the years object for the value
        for (i = 0; i < countries.length; i++) {
            country = countries[i].name;
            uniqueCountries[country] = {};
            for (j = beginYear; j <= endYear; j++) {
                uniqueCountries[country][j] = 0;
            }
        }

        //iterate over the features array to set the count for every year
        for (i = 0; i < features.length; i++) {
            country = features[i].properties.closestCountry;
            year = new Date(features[i].properties.date).getFullYear();
            if (country in uniqueCountries && year in uniqueCountries[country]) {
                uniqueCountries[country][year]++;
            }
        }

        //sort countries by sum of incidents in descending order into array sortedCountries
        sortedCountries = Object.keys(uniqueCountries);
        sortedCountries.sort(function(a, b) {
            var y, aYears, bYears, aCount = 0, bCount = 0;
            aYears = uniqueCountries[a];
            bYears = uniqueCountries[b];
            for(y in aYears) aCount += aYears[y];
            for(y in bYears) bCount += bYears[y];
            if(aCount < bCount) return 1;
            if(aCount > bCount) return -1;
            return 0;
        });

        //iterate of the uniqueCountries to create the final nvd3 linechart-friendly data object
        for (i = 0; i < returnSize; i++) {
            country = sortedCountries[i];
            values = [];
            for (year in uniqueCountries[country]) {
                values.push({
                    x: year,
                    y: uniqueCountries[country][year]
                });
            }
            chartData.push({
                values: values,
                key: country
            });
        }

        console.log(JSON.stringify(chartData));

        return chartData;
    }

    /*
        generate an array with years starting at beginYear, ending at endYear
    */
    function getTickValues(beginYear, endYear) {
        var i, tickValues = [];
        for (i = beginYear; i <= endYear; i++) {
            tickValues.push(i);
        }
        return tickValues;
    }

    /*
        model constructor
        - check if arguments are passed
        - try/catch extract geojson features from passed mapData object
        - try/catch extract the year from passed beginDate and endDate
        - call getData to set the model data
        - set the xaxis tick values according to the passed begin and end years
        - return the model
    */
    return function(mapData, countries, returnSize, beginDate, endDate) {
        var features, beginYear, endYear;
        
        //not guaranteed to have all four arguments; exit gracefully
        if (arguments.length < 4) {
            return model;
        }

        //not guaranteed to have feature list in mapData object; exit gracefully
        try {
            features = mapData.data.features;
        } catch (err) {
            console.log(err);
            return model;
        }

        //not guarateed to have begin and endDates in explicit date format; exit gracefully
        try {
            beginYear = beginDate.getFullYear();
            endYear = endDate.getFullYear();
        } catch (err) {
            console.log(err);
            return model;
        }

        model.data = getData(features, countries, returnSize, beginYear, endYear);  
        model.options.chart.xAxis.tickValues = getTickValues(beginYear, endYear);
        return model;
    };

});