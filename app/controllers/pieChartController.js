'use strict';
define(function () {

    angular
    .module('app')
    .registerController('PieChartController', ['$scope', '$q', 'DataService', 'MorrisChartService',

        function ($scope, $q, DataService, MorrisChartService) {

            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.donutData = {};


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getPieChartData().then(
                    function (response) {
                        $scope.donutData = response.data.donutData;
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
            /// MORRIS DONUT CHART
            /// ---------------------------------------------------------------------------------
            var createMorrisDonutChart = function () {
                MorrisChartService.createDonutChart('morris-donut-graph', $scope.donutData);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createMorrisDonutChart();
                }
            );
        }
    ]);
});