define(function () {
    angular
        .module('app')
        .registerController('LineChartController', ['$scope', '$q', 'DataService', 'FlotChartService', 'EasyPieChartService', 'ChartJSService',
            
            function ($scope, $q, DataService, FlotChartService, EasyPieChartService, ChartJSService) {

                /// ---------------------------------------------------------------------------------
                /// LOCAL VARIABLE FOR STORING DATA FROM JSON FILE
                /// ---------------------------------------------------------------------------------
                $scope.data = {};


                /// ---------------------------------------------------------------------------------
                /// GET DATA FROM JSON FILE
                /// ---------------------------------------------------------------------------------
                var getData = function () {
                    var defered = $q.defer();
                    DataService.getLineChartData().then(
                        function (response) {
                            $scope.data = response.data.data;
                            $scope.stats = response.data.stats;
                            defered.resolve()
                        },
                        function (error) {
                            console.log(error);
                            defered.reject();
                        }
                    );
                    return defered.promise;
                };


                /// ---------------------------------------------------------------------------------
                /// CREATE LINE CHART (FLOT CHART)
                /// ---------------------------------------------------------------------------------
                var createFlotChart = function () {
                    FlotChartService.createLineChart("#flot-sales", $scope.data);
                };


                /// ---------------------------------------------------------------------------------
                /// CREATE STATS PIE CHARTS (EASY-PIE CHARTS) (uses a directive)
                /// ---------------------------------------------------------------------------------
                var createEasyPieCharts = function () {
                    EasyPieChartService.createStatCharts();
                };


                /// ---------------------------------------------------------------------------------
                /// CREATE LINE CHART (CHART JS)
                /// ---------------------------------------------------------------------------------
                createChartJS = function () {
                    var data1 = [], data2 = [];
                    angular.forEach($scope.data[0].data, function (obj, idx) {
                        data1.push(obj[1]);
                    });
                    angular.forEach($scope.data[1].data, function (obj, idx) {
                        data2.push(obj[1]);
                    });
                    ChartJSService.createLineChart("lineChartCanvas", data1, data2);
                };


                /// ---------------------------------------------------------------------------------
                /// INITIALISE
                /// ---------------------------------------------------------------------------------
                getData().then(
                    function () {
                        createFlotChart();
                        createEasyPieCharts();
                        createChartJS();
                    }
                )
            }
        ]);
});