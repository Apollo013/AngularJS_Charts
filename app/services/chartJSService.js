'use strict';
define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var files = [PluginsPath + 'chart.chartjs/Chart.min.js'];


        /// ---------------------------------------------------------------------------------
        /// LINE CHART VARIABLES
        /// ---------------------------------------------------------------------------------
        var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var lineChartDefaults = {
            labels: labels,
            datasets: [
                {
                    label: "2015",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: []
                },
                {
                    label: "2016",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: []
                }
            ]
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (COMPARISON)
        /// ---------------------------------------------------------------------------------
        var createLineChart = function (elem, data1, data2) {
            injectPlugins().then(function () {
                // CREATE THE CHART
                var newOptions = angular.copy(lineChartDefaults);
                newOptions.datasets[0].data = data1;
                newOptions.datasets[1].data = data2;
                var ctx = document.getElementById(elem).getContext("2d");
                var lineChart = new Chart(ctx).Line(newOptions);
            });
        };


        var createBarChart = function (elem, data) {
            injectPlugins().then(function () {
                var barChartCanvas = {
                    labels: labels,
                    datasets: [
                        {
                            fillColor: "rgba(220,220,220,0.5)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: data
                        }
                    ]
                };

                var ctx = document.getElementById(elem).getContext("2d");
                new Chart(ctx).Bar(barChartCanvas);
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
        service.createBarChart = createBarChart;
        return service;
    };

    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;
});