define(function () {

    angular
    .module('app')
    .registerController('BarChartController', ['$scope', '$q', 'DataService', 'FlotChartService', 'EasyPieChartService', 'ChartJSService',
        function ($scope, $q, DataService, FlotChartService, EasyPieChartService, ChartJSService) {

            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.data = {};
            $scope.hozdata = {};


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getBarChartData().then(
                    function (response) {
                        $scope.data = response.data;
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
            /// CREATE BAR CHART (FLOT CHART)
            /// ---------------------------------------------------------------------------------
            var createFlotChart = function () {
                FlotChartService.createBarChart('#flot-bar', $scope.data);
            };


            /// ---------------------------------------------------------------------------------
            /// CREATE HORIZONTAL BAR CHART (FLOT CHART)
            /// ---------------------------------------------------------------------------------
            var createHozFlotChart = function () {
                FlotChartService.createHozBarChart('#flot-bar-horizontal', $scope.hozdata);
            };


            /// ---------------------------------------------------------------------------------
            /// CREATE BAR CHART (CHART JS)
            /// ---------------------------------------------------------------------------------
            var createChartJS = function () {
                var data1 = [];
                angular.forEach($scope.data.data1, function (obj, idx) {
                    data1.push(obj[1]);
                });
                ChartJSService.createBarChart('barChartCanvas', data1);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createFlotChart();
                    createHozFlotChart();
                    createChartJS();
                }
            );
        }
    ]);

});