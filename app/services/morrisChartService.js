'use strict';
define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var path = PluginsPath + 'chart.morris/';
        var files = [PluginsPath + 'raphael.min.js',
                    path + 'morris.min.js'];


        /// ---------------------------------------------------------------------------------
        /// LINE CHART
        /// ---------------------------------------------------------------------------------
        var createAreaChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Area({
                    element: elem,
                    data: data,
                    xkey: 'period',
                    ykeys: ['iphone', 'ipad', 'itouch'],
                    labels: ['iPhone', 'iPad', 'iPod Touch'],
                    pointSize: 2,
                    hideHover: 'auto'
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// BAR CHART (COLOURIZED)
        /// ---------------------------------------------------------------------------------
        var createColourBarChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Bar({
                    element:elem,
                    data: data,
                    xkey: 'x',
                    ykeys: ['y'],
                    labels: ['Y'],
                    barColors: function (row, series, type) {
                        if (type === 'bar') {
                            var red = Math.ceil(150 * row.y / this.ymax);
                            return 'rgb(' + red + ',0,0)';
                        }
                        else {
                            return '#000';
                        }
                    }
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (YEAR)
        /// ---------------------------------------------------------------------------------
        var createYearLineChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Line({
                    element: elem,
                    data: data,
                    xkey: 'period',
                    ykeys: ['sold', 'registered'],
                    labels: ['SOLD', 'REGISTERED']
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (DECIMAL)
        /// ---------------------------------------------------------------------------------
        var createDecimalLineChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Line({
                    element: elem,
                    data: data,
                    xkey: 'x',
                    ykeys: ['y'],
                    labels: ['sin(x)'],
                    parseTime: false,
                    hoverCallback: function (index, options) {
                        var row = options.data[index];
                        return "sin(" + row.x + ") = " + row.y;
                    },
                    xLabelMargin: 10
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (TIME)
        /// ---------------------------------------------------------------------------------
        var createTimeLineChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Line({
                    element: elem,
                    data: data,
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned'],
                    labels: ['Licensed', 'SORN'],
                    events: [
                      '2011-04',
                      '2011-07'
                    ]
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (NON CONTINUOUS)
        /// ---------------------------------------------------------------------------------
        var createNonContinuousLineChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Line({
                    element: elem,
                    data: data,
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned', 'other'],
                    labels: ['Licensed', 'SORN', 'Other'],
                    /* custom label formatting with `xLabelFormat` */
                    xLabelFormat: function (d) { return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); },
                    /* setting `xLabels` is recommended when using xLabelFormat */
                    xLabels: 'day'
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// BAR CHART (NORMAL)
        /// ---------------------------------------------------------------------------------
        var createBarChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Bar({
                    element: elem,
                    data: data,
                    xkey: 'x',
                    ykeys: ['y', 'z', 'a'],
                    labels: ['Y', 'Z', 'A']
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// STACK CHART
        /// ---------------------------------------------------------------------------------
        var createStackChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Bar({
                    element: elem,
                    data: data,
                    axes: false,
                    grid: false,
                    xkey: 'x',
                    ykeys: ['y', 'z', 'a'],
                    labels: ['Y', 'Z', 'A'],
                    stacked: true
                });
            });
        };


        /// ---------------------------------------------------------------------------------
        /// DONUT CHART
        /// ---------------------------------------------------------------------------------
        var createDonutChart = function (elem, data) {
            injectPlugins().then(function () {
                Morris.Donut({
                    element: elem,
                    data: data,
                    formatter: function (x) { return x + "%"; }
                });
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
        service.createAreaChart = createAreaChart;
        service.createColourBarChart = createColourBarChart;
        service.createBarChart = createBarChart;
        service.createYearLineChart = createYearLineChart;
        service.createDecimalLineChart = createDecimalLineChart;
        service.createTimeLineChart = createTimeLineChart;
        service.createNonContinuousLineChart = createNonContinuousLineChart;
        service.createStackChart = createStackChart;
        service.createDonutChart = createDonutChart;
        return service;

    }

    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;

});