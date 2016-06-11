define(function () {
    angular
    .module('app')
    .registerController('AreaChartController',['$scope', '$q', 'DataService', 'FlotChartService', 'EasyPieChartService', 'ChartJSService', 'MorrisChartService',
            
        function ($scope, $q, DataService, FlotChartService, EasyPieChartService, ChartJSService, MorrisChartService) {
            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLES FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.data = {};
            $scope.appleData = [];


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getAreaChartData().then(
                    function (response) {
                        $scope.data = response.data.data;
                        $scope.stats = response.data.stats;
                        $scope.appleData = response.data.apple;
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
                FlotChartService.createAreaChart("#flot-sales", $scope.data);
            };


            /// ---------------------------------------------------------------------------------
            /// EASY PIE CHARTS (EASY-PIE CHARTS) (uses a directive)
            /// ---------------------------------------------------------------------------------
            var createEasyPieCharts = function () {
                EasyPieChartService.createStatCharts();
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS
            /// ---------------------------------------------------------------------------------
            var createChartJS = function () {
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
                ChartJSService.createAreaChart("areaChartCanvas", dataset);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisChart = function () {
                MorrisChartService.createAreaChart('morris-graph', $scope.appleData);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createFlotChart();
                    createEasyPieCharts();
                    createChartJS();
                    createMorrisChart();
                }
            );
        }            
    ]);
});