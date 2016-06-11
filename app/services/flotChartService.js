'use strict';
define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var flotChartPath = PluginsPath + 'chart.flot/';
        var baseFile = [flotChartPath + 'jquery.flot.min.js'];
        var files = [flotChartPath + 'jquery.flot.resize.min.js',
                                        flotChartPath + 'jquery.flot.time.min.js',
                                        flotChartPath + 'jquery.flot.fillbetween.min.js',
                                        flotChartPath + 'jquery.flot.orderBars.min.js',
                                        flotChartPath + 'jquery.flot.pie.min.js',
                                        flotChartPath + 'jquery.flot.tooltip.min.js'];


        /// ---------------------------------------------------------------------------------
        /// LINE CHART VARIABLES
        /// ---------------------------------------------------------------------------------
        var monthTicks = [[0, 'Jan'], [1, 'Feb'], [2, 'Mar'], [3, 'Apr'], [4, 'May'], [5, 'Jun'], [6, 'Jul'], [7, 'Aug'], [8, 'Sep'], [9, 'Oct'], [10, 'Nov'], [11, 'Dec']];
        var colours = { border: '#eaeaea', red: '#E24913', blue: '#6595b4', green: '#7e9d3a' };


        /// ---------------------------------------------------------------------------------
        /// DEFAULT OPTIONS FOR LINE CHART
        /// ---------------------------------------------------------------------------------
        var defaultLineChartOptions = {
            xaxis: {
                ticks: monthTicks,
                tickLength: 0
            },
            series: {
                lines: {
                    show: true,
                    lineWidth: 1
                },
                shadowSize: 0
            },
            selection: {
                mode: "x"
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: colours.border,
                borderWidth: 0,
                borderColor: colours.border
            },
            tooltip: true,
            tooltipOpts: {
                //content: "Sales: %x <span class='block'>%y</span>",
                content: "Units Sold: %y",
                dateFormat: "%y-%0m-%0d",
                defaultTheme: false
            },
            colors: [colours.red, colours.blue]
        };


        /// ---------------------------------------------------------------------------------
        /// DEFAULT OPTIONS FOR AREA CHART (fill & fillColour)
        /// ---------------------------------------------------------------------------------
        var defaultAreaChartOptions = {
            xaxis: {
                ticks: monthTicks,
                tickLength: 0
            },
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.15
                        }]
                    }
                },
                shadowSize: 0
            },
            selection: {
                mode: "x"
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: colours.border,
                borderWidth: 0,
                borderColor: colours.border
            },
            tooltip: true,
            tooltipOpts: {
                //content: "Sales: %x <span class='block'>%y</span>",
                content: "Units Sold: %y",
                dateFormat: "%y-%0m-%0d",
                defaultTheme: false
            },
            colors: [colours.red, colours.blue]
        };


        /// ---------------------------------------------------------------------------------
        /// DEFAULT OPTIONS FOR BAR CHART
        /// ---------------------------------------------------------------------------------
        var defaultBarChartOptions = {
            xaxis: {
                ticks: monthTicks,
                tickLength: 0
            },
            grid: {
                show: true,
                hoverable: true,
                clickable: true,
                tickColor: colours.border,
                borderWidth: 0,
                borderColor: colours.border
            },
            tooltip: false,
            tooltipOpts: {
                content: "<b>%x</b> = <span>%y</span>",
                defaultTheme: false
            },
            colors: [colours.red, colours.blue, colours.green, colours.border],
            legend: {
                labelBoxBorderColor: "none",
                position: "ne"
            },
            series: {
                bars: {
                    show: true
                }
            },
            bars: {
                barWidth: 0.25
            }
        };


        /// ---------------------------------------------------------------------------------
        /// DEFAULT OPTIONS FOR PIE CHART
        /// ---------------------------------------------------------------------------------
        var defaultPieChartOptions = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.5,
                    radius: 1,
                    label: {
                        show: false,
                        radius: 2 / 3,
                        formatter: function (label, series) {
                            return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: true,
                noColumns: 1, // number of colums in legend table
                labelFormatter: null, // fn: string -> string
                labelBoxBorderColor: "#000", // border color for the little label boxes
                container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                position: "ne", // position of default legend container within plot
                margin: [5, 10], // distance from grid edge to default legend container within plot
                backgroundColor: "#efefef", // null means auto-detect
                backgroundOpacity: 1 // set to 0 to avoid background
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        };


        /// ---------------------------------------------------------------------------------
        /// LINE CHART (COMPARISON)
        /// ---------------------------------------------------------------------------------
        var createLineChart = function (elem, data, options) {
            var defered = $q.defer();

            if (elem === '' || isEmpty(data)) {
                defered.reject('Missing element name or data');
            }
            else {
                injectPlugins().then(function () {
                    // EXTEND OPTIONS
                    var newOptions = {};
                    if (!isEmpty(options)) {
                        angular.extend(newOptions, defaultLineChartOptions, options);
                    }
                    else {
                        angular.extend(newOptions, defaultLineChartOptions);
                    }
                    // CREATE CHART
                    plotChart(elem, data, newOptions);
                    defered.resolve();
                });
            }
            return defered.promise;
        };


        /// ---------------------------------------------------------------------------------
        /// AREA CHART (COMPARISON)
        /// ---------------------------------------------------------------------------------
        var createAreaChart = function (elem, data, options) {
            var defered = $q.defer();

            if (elem === '' || isEmpty(data)) {
                defered.reject('Missing element name or data');
            }
            else {
                injectPlugins().then(function () {
                    // EXTEND OPTIONS
                    var newOptions = {};
                    if (!isEmpty(options)) {
                        angular.extend(newOptions, defaultAreaChartOptions, options);
                    }
                    else {
                        angular.extend(newOptions, defaultAreaChartOptions);
                    }
                    // CREATE CHART
                    plotChart(elem, data, newOptions);
                    defered.resolve();
                });
            }
            return defered.promise;
        };


        /// ---------------------------------------------------------------------------------
        /// PIE CHART
        /// ---------------------------------------------------------------------------------
        var createPieChart = function (elem, data, options) {
            injectPlugins().then(
                function (response) {
                    // EXTEND OPTIONS
                    var newOptions = {};
                    if (!isEmpty(options)) {
                        angular.extend(newOptions, defaultPieChartOptions, options);
                    }
                    else {
                        angular.extend(newOptions, defaultPieChartOptions);
                    }

                    // CREATE CHART
                    plotChart(elem, data, newOptions);
                }
            );
        };

        /// ---------------------------------------------------------------------------------
        /// BAR CHART (VERTICAL)
        /// ---------------------------------------------------------------------------------
        var createBarChart = function (elem, data, options) {
            injectPlugins().then(
                function (response) {
                    // EXTEND OPTIONS
                    var newOptions = {};
                    if (!isEmpty(options)) {
                        angular.extend(newOptions, defaultBarChartOptions, options);
                    }
                    else {
                        angular.extend(newOptions, defaultBarChartOptions);
                    }

                    // SET BAR DATA
                    var dataset = new Array(), count = 1;
                    angular.forEach(data, function (dataArray, idx) {
                        dataset.push({
                            label: 'Product ' + count,
                            data: dataArray,
                            bars: {
                                lineWidth: 1,
                                order: count
                            }
                        });
                        count++;
                    });

                    // CREATE CHART
                    plotChart(elem, dataset, newOptions);
                    bindTooltip(elem);
                }
            );
        };


        /// ---------------------------------------------------------------------------------
        /// BAR CHART (HORIZONTAL)
        /// ---------------------------------------------------------------------------------
        var createHozBarChart = function (elem, data, options) {
            var defered = $q.defer();

            if (elem === '' || isEmpty(data)) {
                defered.reject('Missing element name or data');
                return;
            }
            else {
                injectPlugins().then(
                    function (response) {
                        // EXTEND OPTIONS
                        var newOptions = {};
                        if (!isEmpty(options)) {
                            angular.extend(newOptions, defaultBarChartOptions, options);
                        }
                        else {
                            angular.extend(newOptions, defaultBarChartOptions);
                        }

                        // SET BAR DATA
                        var dataset = new Array(), count = 1;
                        angular.forEach(data, function (dataArray, idx) {
                            dataset.push({
                                label: 'Product ' + count,
                                data: dataArray,
                                bars: {
                                    horizontal: true,
                                    lineWidth: 1,
                                    order: count
                                }
                            });
                            count++;
                        });

                        newOptions.xaxis.ticks = [];
                        // CREATE CHART
                        plotChart(elem, dataset, newOptions);
                        bindTooltip(elem,true);
                        defered.resolve();
                    }
                );
            }
            return defered.promise;
        };


        /// ---------------------------------------------------------------------------------
        /// CREATE AND BIND TOOLTIP
        /// ---------------------------------------------------------------------------------
        var previousPoint = null, previousLabel = null;
        var bindTooltip = function (elem, hoz) {
            $(elem).bind("plothover", function (event, pos, item) {
                if (item) {
                    if (previousLabel !== item.series.label || previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();

                        var x = item.datapoint[0];
                        var y = item.datapoint[1];
                        var color = item.series.color;

                        if (hoz) {
                            showTooltip(item.pageX, item.pageY, color, "<strong>" + item.series.label + ": " + x + "</strong>");
                        }
                        else {
                            showTooltip(item.pageX, item.pageY, color, "<strong>" + item.series.label + ": " + y + "</strong>");
                        }
                        
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        };


        /// ---------------------------------------------------------------------------------
        /// DISPLAY TOOLTIP
        /// ---------------------------------------------------------------------------------
        var showTooltip = function (x, y, color, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x,
                border: '2px solid ' + color,
                padding: '3px',
                'font-size': '9px',
                'border-radius': '5px',
                'background-color': '#fff',
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.9
            }).appendTo("body").fadeIn(200);
        };


        /// ---------------------------------------------------------------------------------
        /// PLOT CHART
        /// ---------------------------------------------------------------------------------
        var plotChart = function (elem, data, options) {
            return jQuery.plot(jQuery(elem), data, options);
        };


        /// ---------------------------------------------------------------------------------
        /// INJECT PLUGINS
        /// ---------------------------------------------------------------------------------
        var injectPlugins = function () {
            var defered = $q.defer();
            /// BASE FLOT CHART FILE REQUIRES INJECTING SEPERATELY PRIOR TO ANY OTHER FLOT MODULES (PROCESSING TIMING ISSUE ?!)
            require(baseFile, function () {
                /// INJECT ADDITIONAL FLOT FILES
                require(files, function () {
                    defered.resolve();                  
                });
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
        service.createHozBarChart = createHozBarChart;
        service.createPieChart = createPieChart;
        return service;
    }


    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;

});