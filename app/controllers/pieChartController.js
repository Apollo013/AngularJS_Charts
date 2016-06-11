'use strict';
define(function () {

    angular
    .module('app')
    .registerController('PieChartController', ['$scope', '$q', 'DataService', 'MorrisChartService', 'FlotChartService',

        function ($scope, $q, DataService, MorrisChartService, FlotChartService) {

            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.donutData = [];
            $scope.flotPieData = [];


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getPieChartData().then(
                    function (response) {
                        $scope.donutData = response.data.donutData;
                        $scope.flotPieData = response.data.flotPieData;
                        /*
                        var data_pie = [];
                        var series = Math.floor(Math.random() * 10) + 1;
                        for (var i = 0; i < series; i++) {
                            data_pie[i] = {
                                label: "Series" + (i + 1),
                                data: Math.floor(Math.random() * 100) + 1
                            };
                        }

                        console.log(JSON.stringify(data_pie));
                        */
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
            /// FLOT CHART
            /// ---------------------------------------------------------------------------------
            var createFlotChart = function () {
                FlotChartService.createPieChart("#flot-pie", $scope.flotPieData);
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createMorrisDonutChart();
                    createFlotChart();
                }
            );
        }
    ]);
});