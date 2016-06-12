'use strict';

define([], function () {

    /// ---------------------------------------------------------------------------------
    /// SITE WIDE ROUTING CONFIGURATION
    /// ---------------------------------------------------------------------------------
    function config($routeProvider, $locationProvider) {

        /// ---------------------------------------------------------------------------------
        /// LAZY LOADING EXAMPLE
        /// ---------------------------------------------------------------------------------
        $routeProvider
        .when('/linecharts', {
            title: 'Line Charts',
            description: 'Line charts using Flot Charts, Morris Charts & ChartJS with some Easy-Pie Charts',
            templateUrl: 'views/lineCharts.html',
            controller: 'LineChartController',            
            resolve: {
                load: ['$q', function ($q) {
                    var defered = $q.defer();
                    /// INJECT OUR CONTROLLER
                    require(['../controllers/lineChartController'], function () {
                        defered.resolve();
                    });
                    return defered.promise;
                }]
            }
        })
        .when('/barcharts', {
            title: 'Bar Charts',
            description: 'Bar charts using Flot Charts, Morris Charts & ChartJS',
            templateUrl: 'views/barCharts.html',
            controller: 'BarChartController',            
            resolve: {
                load: ['$q', function ($q) {
                    var defered = $q.defer();
                    require(['../controllers/barChartController'], function () {
                        defered.resolve();
                    });
                    return defered.promise;
                }]
            }
        })
        .when('/piecharts', {
            title: 'Pie Charts',
            description: 'Pie charts using Flot Charts, Morris Charts & ChartJS',
            templateUrl: 'views/pieCharts.html',
            controller: 'PieChartController',
            resolve: {
                load: ['$q', function ($q) {
                    var defered = $q.defer();
                    require(['../controllers/pieChartController'], function () {
                        defered.resolve();
                    });
                    return defered.promise;
                }]
            }
        })
        .when('/areacharts', {
            title: 'Area Charts',
            description: 'Area charts using Flot Charts, Morris Charts, ChartJS & Easy-Pie Charts',
            templateUrl: 'views/areaCharts.html',
            controller: 'AreaChartController',
            resolve: {
                load: ['$q', function ($q) {
                    var defered = $q.defer();
                    require(['../controllers/areaChartController'], function () {
                        defered.resolve();
                    });
                    return defered.promise;
                }]
            }
        })
        .otherwise({ redirectTo: '/areacharts' });

        /// ---------------------------------------------------------------------------------
        /// Enable html5Mode for pushstate ('#'-less URLs)
        /// This requires a 'base' tag in the header section of the index page
        /// ---------------------------------------------------------------------------------
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
    
    /// ---------------------------------------------------------------------------------
    /// INJECT DEPENDENCIES    
    /// ---------------------------------------------------------------------------------
    config.$inject = ['$routeProvider', '$locationProvider'];

    /// ---------------------------------------------------------------------------------
    /// RETURN CONFIG OBJECT    
    /// ---------------------------------------------------------------------------------
    return config;
});
