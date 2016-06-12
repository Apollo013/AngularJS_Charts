'use strict';
define(function () {

    angular
    .module('app')
    .registerController('PieChartController', ['$scope', '$q', 'DataService', 'MorrisChartService', 'FlotChartService', 'ChartJSService', 'EasyPieChartService',

        function ($scope, $q, DataService, MorrisChartService, FlotChartService, ChartJSService, EasyPieChartService) {

            /// ---------------------------------------------------------------------------------
            /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            $scope.donutData = [];
            $scope.flotPieData = [];
            $scope.polarData = [];
            $scope.jsDonutData = [];
            $scope.jsPieData = [];
            $scope.jsRadarData = {};
            $scope.easyPieData = [];


            /// ---------------------------------------------------------------------------------
            /// GET DATA FROM JSON FILE
            /// ---------------------------------------------------------------------------------
            var getData = function () {
                var defered = $q.defer();
                DataService.getPieChartData().then(
                    function (response) {
                        $scope.easyPieData = response.data.easyPieData;
                        $scope.donutData = response.data.donutData;
                        $scope.flotPieData = response.data.flotPieData;
                        $scope.polarData = response.data.polarData;
                        $scope.jsDonutData = response.data.jsDonutData;
                        $scope.jsPieData = response.data.jsPieData;
                        $scope.jsRadarData = response.data.jsRadarData.datasets;
                        
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
            /// CHART JS (POLAR)
            /// ---------------------------------------------------------------------------------
            var createPolarChart = function () {
                ChartJSService.createPolarChart("polarAreaChartCanvas", $scope.polarData);
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS (RADAR)
            /// ---------------------------------------------------------------------------------
            var createRadarChart = function () {
                ChartJSService.createRadarChart("radarChartCanvas", $scope.jsRadarData);
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS (PIE)
            /// ---------------------------------------------------------------------------------
            var createPieChart = function () {
                ChartJSService.createPieChart("pieChartCanvas", $scope.jsPieData);
            };


            /// ---------------------------------------------------------------------------------
            /// CHART JS (DONUT)
            /// ---------------------------------------------------------------------------------
            var createDountChart = function () {
                ChartJSService.createDountChart("doughnutChartCanvas", $scope.jsDonutData);
            };
            
            
            /// ---------------------------------------------------------------------------------
            /// EASY PIE CHARTS (EASY-PIE CHARTS) (uses a directive)
            /// ---------------------------------------------------------------------------------
            var createEasyPieCharts = function () {
                EasyPieChartService.createStatCharts();
            };


            /// ---------------------------------------------------------------------------------
            /// INITIALISE
            /// ---------------------------------------------------------------------------------
            getData().then(
                function () {
                    createEasyPieCharts();
                    createRadarChart();
                    createPolarChart();                    
                    createPieChart();
                    createDountChart();
                    createMorrisDonutChart();
                    createFlotChart();
                }
            );
        }
    ]);
});