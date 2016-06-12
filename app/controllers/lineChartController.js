define(function () {
    angular
    .module('app')
    .registerController('LineChartController', ['$scope', '$q', 'DataService', 'FlotChartService', 'EasyPieChartService', 'ChartJSService', 'MorrisChartService',
            
        function ($scope, $q, DataService, FlotChartService, EasyPieChartService, ChartJSService, MorrisChartService) {
            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.data = {};
            $scope.yearData = [];
            $scope.decimalData = [];
            $scope.timeData = [];
            $scope.nonConData = [];


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getLineChartData().then(
                    function (response) {
                        $scope.data = response.data.data;
                        $scope.stats = response.data.stats;
                        $scope.yearData = response.data.yearData;
                        $scope.timeData = response.data.timeData;
                        $scope.nonConData = response.data.nonConData;

                        // CREATE DECIAML DATA FOR MORRIS DECIMAL GRAPH
                        for (var x = 0; x <= 360; x += 10) {
                            $scope.decimalData.push({ x: x, y: Math.sin(Math.PI * x / 180).toFixed(4) });
                        }

                        defered.resolve();
                    },
                    function (error) {
                        console.log(error);
                        defered.reject();
                    }
                );
                return defered.promise;
            };


            /// ---------------------------------------------------------------------------------
            /// FLOT CHART
            /// ---------------------------------------------------------------------------------
            var createFlotChart = function () {
                FlotChartService.createLineChart("#flot-sales", $scope.data);
            };


            /// ---------------------------------------------------------------------------------
            /// EASY-PIE CHARTS (uses a directive)
            /// ---------------------------------------------------------------------------------
            var createEasyPieCharts = function () {
                EasyPieChartService.createPieCharts();
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS
            /// ---------------------------------------------------------------------------------
            createChartJS = function () {
                // Rearrange the data so that chartjs can work with it

                // Vars
                var dataset = [];
                var data1 = { label: "", data: [] }, data2 = { label: "", data: [] };

                // Rearrange Data
                angular.forEach($scope.data[0].data, function (obj, idx) {
                    data1.data.push(obj[1]);
                }); 
                angular.forEach($scope.data[1].data, function (obj, idx) {
                    data2.data.push(obj[1]);
                });

                // Assign Labels
                data1.label = $scope.data[0].label;
                data2.label = $scope.data[1].label;

                // Create DataSet
                dataset.push(data1);
                dataset.push(data2);

                // Create Chart
                ChartJSService.createLineChart("lineChartCanvas", dataset);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS YEAR CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisYearChart = function () {
                MorrisChartService.createYearLineChart('morris-year-graph', $scope.yearData);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS DECIMAL CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisDecimalChart = function () {
                MorrisChartService.createDecimalLineChart('morris-decimal-graph', $scope.decimalData);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS TIME CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisTimeChart = function () {
                MorrisChartService.createTimeLineChart('morris-time-graph', $scope.timeData);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS NON-CONTINUOUS CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisNonContinuousChart = function () {
                MorrisChartService.createNonContinuousLineChart('morris-non-continue-graph', $scope.nonConData);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createFlotChart();
                    createEasyPieCharts();
                    createChartJS();
                    createMorrisYearChart();
                    createMorrisDecimalChart();
                    createMorrisTimeChart();
                    createMorrisNonContinuousChart();
                }
            );
        }
    ]);
});