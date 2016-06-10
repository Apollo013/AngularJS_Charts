'use strict';

define(['routeConfig',
        '../runners/appRunner',
        '../services/dataService',
        '../services/flotChartService',
        '../services/easypieChartService',
        '../services/chartJSService',
        '../directives/easypieStatDirective'],

    function (routes, appRunners, dataService, flotChartService, easypieChartService, chartJSService, easypieStatDirective) {

        /// ---------------------------------------------------------------------------------
        /// THIS IS OUR MAIN MODULE
        /// ---------------------------------------------------------------------------------
        var app = angular.module('app', ['ngRoute']);

        /// ---------------------------------------------------------------------------------
        /// CONSTANTS
        /// ---------------------------------------------------------------------------------
        app.constant('PluginsPath', '../../assets/plugins/');


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
        

        /// ---------------------------------------------------------------------------------
        /// DIRECTIVES
        /// ---------------------------------------------------------------------------------
        app.directive('easypieStat', easypieStatDirective);


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
