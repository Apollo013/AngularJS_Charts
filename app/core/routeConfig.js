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
            description: 'Line charts using Flot Charts & Chartjs with some Easy-Pie Charts',
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
            description: 'A combination of Flot Charts & Chartjs',
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
            title: 'Bar Charts',
            description: 'A combination of Flot Charts & Easy-Pie Charts',
            templateUrl: 'views/pieCharts.html'
        })
        .otherwise({ redirectTo: '/linecharts' });

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
    config.$inject = ['$routeProvider', '$locationProvider']

    /// ---------------------------------------------------------------------------------
    /// RETURN CONFIG OBJECT    
    /// ---------------------------------------------------------------------------------
    return config;
});
