'use strict';

define(['routeConfig',
        '../runners/appRunner',
        '../services/dataService',
        '../services/flotChartService',
        '../services/easypieChartService',
        '../services/chartJSService',
        '../directives/easypieStatDirective',
        '../services/morrisChartService',
        '../directives/easypieGraphDirective'],

    function (routes, appRunners, dataService, flotChartService, easypieChartService, chartJSService, easypieStatDirective, morrisChartService, easypieGraphDirective) {

        /// ---------------------------------------------------------------------------------
        /// THIS IS OUR MAIN MODULE
        /// ---------------------------------------------------------------------------------
        var app = angular.module('app', ['ngRoute']);


        /// ---------------------------------------------------------------------------------
        /// CONSTANTS
        /// ---------------------------------------------------------------------------------
        app.constant('PluginsPath', '../../assets/plugins/'); // Path to plugins


        /// ---------------------------------------------------------------------------------
        /// CONTROLLERS
        /// ---------------------------------------------------------------------------------
        /// GET A DELEGATE FUNCTION TO ALLOW OUR 'app' TO REGISTER IT'S CONTROLLERS WHEN NEEDED
        /// THIS WILL ALLOW US TO PERFORM LAZY LOADING (SEE route-config under '/linecharts' route)
        app.config(['$controllerProvider', function ($controllerProvider) {
            app.registerController = $controllerProvider.register;
        }]);


        /// ---------------------------------------------------------------------------------
        /// SERVICES
        /// ---------------------------------------------------------------------------------
        app.factory('DataService', dataService);
        app.factory('FlotChartService', flotChartService);
        app.factory('EasyPieChartService', easypieChartService);
        app.factory('ChartJSService', chartJSService);
        app.factory('MorrisChartService', morrisChartService);

        
        /// ---------------------------------------------------------------------------------
        /// DIRECTIVES
        /// ---------------------------------------------------------------------------------
        app.directive('easypieStat', easypieStatDirective);
        app.directive('easypieGraph', easypieGraphDirective);

        
        /// ---------------------------------------------------------------------------------
        /// CONFIGURATIONS
        /// ---------------------------------------------------------------------------------
        app.config(routes);


        /// ---------------------------------------------------------------------------------
        /// RUNNERS
        /// ---------------------------------------------------------------------------------
        app.run(appRunners);
    }
);
