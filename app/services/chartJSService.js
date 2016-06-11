'use strict';
define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var files = [PluginsPath + 'chart.chartjs/Chart.min.js'];


        /// ---------------------------------------------------------------------------------
        /// CHART VARIABLES
        /// ---------------------------------------------------------------------------------
        var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var colours = [{ fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)" },
                       { fillColor: "rgba(151,187,205,0.2)", strokeColor: "rgba(151,187,205,1)" }];


        /// ---------------------------------------------------------------------------------
        /// LINE CHART DEFAULTS
        /// ---------------------------------------------------------------------------------
        var lineChartSet = {
            label: "",
            fill: false,
            fillColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointColor: "rgba(0,0,0,0)",
            pointStrokeColor: "rgba(0,0,0,0)",
            data: []
        };
        var lineChartDefaults = {
            labels: labels,
            datasets: []
        };


        /// ---------------------------------------------------------------------------------
        /// BAR CHART DEFAULTS
        /// ---------------------------------------------------------------------------------
        var barChartDefaults = {
            labels: labels,
            datasets: [
                {
                    fillColor: "rgba(101,149,180,0.5)",
                    strokeColor: "rgba(0,0,0,0)",
                    highlightFill: "rgba(101,149,180,0.75)",
                    highlightStroke: "rgba(101,149,180,1)",
                    borderWidth: 1,
                    data: []
                }
            ]
        };


        /// ---------------------------------------------------------------------------------
        /// AREA CHART DEFAULTS
        /// ---------------------------------------------------------------------------------
        var areaChartSet = {
            label: "2015",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        };
        var areaChartDefaults = {
            labels: labels,
            datasets: []
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (COMPARISON)
        /// ---------------------------------------------------------------------------------
        var createLineChart = function (elem, dataset) {
            injectPlugins().then(function () {
                // Create a new options object
                var newOptions = angular.copy(lineChartDefaults);
                angular.forEach(dataset, function (options, idx) {
                    // create a new option set
                    var set = angular.extend({}, lineChartSet, options);
                    set.strokeColor = colours[idx].strokeColor;
                    // add the set
                    newOptions.datasets.push(set);
                });
                var ctx = document.getElementById(elem).getContext("2d");
                new Chart(ctx).Line(newOptions);
            });
        };


        /// ---------------------------------------------------------------------------------
        /// AREA CHART (COMPARISON)
        /// ---------------------------------------------------------------------------------
        var createAreaChart = function (elem, dataset) {
            injectPlugins().then(function () {
                // Create a new options object
                var newOptions = angular.copy(areaChartDefaults);
                angular.forEach(dataset, function (options, idx) {
                    // create a new option set
                    var set = angular.extend({}, areaChartSet, options);
                    set.fillColor = colours[idx].fillColor;
                    set.strokeColor = colours[idx].strokeColor;
                    set.pointColor = colours[idx].strokeColor;
                    set.pointHighlightStroke = colours[idx].strokeColor;
                    // add the set
                    newOptions.datasets.push(set);
                });
                var ctx = document.getElementById(elem).getContext("2d");
                new Chart(ctx).Line(newOptions);
            });
        };


        /// ---------------------------------------------------------------------------------
        /// BAR CHART
        /// ---------------------------------------------------------------------------------
        var createBarChart = function (elem, data) {
            injectPlugins().then(function () {
                barChartDefaults.datasets[0].data = data;
                var ctx = document.getElementById(elem).getContext("2d");
                new Chart(ctx).Bar(barChartDefaults);
            });
        };


        /// ---------------------------------------------------------------------------------
        /// INJECT PLUGINS
        /// ---------------------------------------------------------------------------------
        var injectPlugins = function () {
            var defered = $q.defer();
            require(files, function () {
                defered.resolve();
            });
            return defered.promise;
        };


        /// ---------------------------------------------------------------------------------
        /// CREATE & RETURN A SERVICE OBJECT
        /// ---------------------------------------------------------------------------------
        var service = {};
        service.createLineChart = createLineChart;
        service.createAreaChart = createAreaChart;
        service.createBarChart = createBarChart;
        return service;
    }

    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;
});