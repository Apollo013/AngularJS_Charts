'use strict';

define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var files = [PluginsPath + 'chart.sparkline/jquery.sparkline.min.js'];


        /// ---------------------------------------------------------------------------------
        /// CREATE CHARTS
        /// ---------------------------------------------------------------------------------
        var createCharts = function () {
            if (jQuery(".sparkline").length > 0) {
                injectPlugins().then(function () {
                    if (jQuery().sparkline) {
                        jQuery('.sparkline').each(function () {
                            jQuery(this).sparkline('html', jQuery(this).data("plugin-options"));
                        });
                    }
                });
            }
        };


        /// ---------------------------------------------------------------------------------
        /// INJECT PLUGINS
        /// ---------------------------------------------------------------------------------
        var injectPlugins = function () {
            var defered = $q.defer();
            require(files, function () {
                defered.resolve();
            });
            return defered.promise;
        };


        /// ---------------------------------------------------------------------------------
        /// CREATE & RETURN A SERVICE OBJECT
        /// ---------------------------------------------------------------------------------
        var service = {};
        service.createCharts = createCharts;
        return service;
    }


    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;

});