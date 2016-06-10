'use strict';
define(function () {

    function dataService($http) {

        /// --------------------------------------------------------------------------
        /// DATA PATH
        /// --------------------------------------------------------------------------
        var dataUrl = 'data/';


        /// --------------------------------------------------------------------------
        /// LINE CHART DATA
        /// --------------------------------------------------------------------------
        var getLineChartData = function () {
            return $http.get(dataUrl + 'line-chart-data.json');
        };


        /// --------------------------------------------------------------------------
        /// BAR CHART DATA
        /// --------------------------------------------------------------------------
        var getBarChartData = function () {
            return $http.get(dataUrl + 'bar-chart-data.json');
        };


        /// --------------------------------------------------------------------------
        /// HOZ BAR CHART DATA
        /// --------------------------------------------------------------------------
        var getHozBarChartData = function () {
            return $http.get(dataUrl + 'bar-chart-hoz-data.json');
        };


        /// --------------------------------------------------------------------------
        /// CREATE & RETURN A SERVICE OBJECT
        /// --------------------------------------------------------------------------
        var service = {};
        service.getLineChartData = getLineChartData;
        service.getBarChartData = getBarChartData;
        service.getHozBarChartData = getHozBarChartData;
        return service;
    }


    /// --------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// --------------------------------------------------------------------------
    dataService.$inject = ['$http'];
    return dataService;
});