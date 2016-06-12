'use strict';
define(function () {

    angular
    .module('app')
    .registerController('InLineChartController', ['SparklineService',
        function (SparklineService) {
            SparklineService.createCharts();
        }
    ]);
});