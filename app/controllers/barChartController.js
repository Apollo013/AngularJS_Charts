define(function () {

    angular
    .module('app')
    .registerController('BarChartController', ['$scope', '$q', 'DataService', 'FlotChartService', 'EasyPieChartService', 'ChartJSService', 'MorrisChartService',
        function ($scope, $q, DataService, FlotChartService, EasyPieChartService, ChartJSService, MorrisChartService) {

            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.data = {};
            $scope.hozdata = {};
            $scope.morrisColourData = [];
            $scope.morrisData = [];
            $scope.stackData = [];


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getBarChartData().then(
                    function (response) {
                        $scope.data.data1 = response.data.data1;
                        $scope.data.data2 = response.data.data2;
                        $scope.data.data3 = response.data.data3;
                        $scope.morrisColourData = response.data.data4;
                        $scope.morrisData = response.data.data5;
                        $scope.stackData = response.data.data6;

                        DataService.getHozBarChartData().then(
                            function (response) {
                                $scope.hozdata = response.data;
                                defered.resolve();
                            }
                        );                        
                    },
                    function (error) {
                        console.log(error);
                        defered.reject();
                    }
                );
                return defered.promise;
            };


            /// ---------------------------------------------------------------------------------
            /// FLOT CHART VERTICAL BAR CHART
            /// ---------------------------------------------------------------------------------
            var createFlotChart = function () {
                FlotChartService.createBarChart('#flot-bar', $scope.data);
            };


            /// ---------------------------------------------------------------------------------
            /// FLOT CHART HORIZONTAL BAR CHART
            /// ---------------------------------------------------------------------------------
            var createHozFlotChart = function () {
                FlotChartService.createHozBarChart('#flot-bar-horizontal', $scope.hozdata);
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS
            /// ---------------------------------------------------------------------------------
            var createChartJS = function () {
                var data1 = [];
                angular.forEach($scope.data.data1, function (obj, idx) {
                    data1.push(obj[1]);
                });
                ChartJSService.createBarChart('barChartCanvas', data1);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS BAR CHART (COLOURIZED)
            /// ---------------------------------------------------------------------------------
            var createMorrisColourBarChart = function () {
                MorrisChartService.createColourBarChart('morris-colour-bar', $scope.morrisColourData);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS BAR CHART (NORMAL)
            /// ---------------------------------------------------------------------------------
            var createMorrisBarChart = function () {
                MorrisChartService.createBarChart('morris-normal-bar', $scope.morrisData);
            };


            /// ---------------------------------------------------------------------------------
            /// MORRIS BAR CHART (  STATCK)
            /// ---------------------------------------------------------------------------------
            var createMorrisStackChart = function () {
                MorrisChartService.createStackChart('morris-stacked-graph', $scope.stackData);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createFlotChart();
                    createHozFlotChart();
                    createChartJS();
                    createMorrisColourBarChart();
                    createMorrisBarChart();
                    createMorrisStackChart();
                }
            );
        }
    ]);
});