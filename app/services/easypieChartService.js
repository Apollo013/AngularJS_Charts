'use strict';

define(function () {

    function chartService($q, PluginsPath) {

        /// ---------------------------------------------------------------------------------
        /// FILE PATHS
        /// ---------------------------------------------------------------------------------
        var files = [PluginsPath + 'chart.easypiechart/jquery.easypiechart.min.js'];


        /// ---------------------------------------------------------------------------------
        /// STAT CHARTS
        /// ---------------------------------------------------------------------------------
        var createStatCharts = function () {
            var defered = $q.defer();

            injectPlugins().then(function () {

                if (jQuery(".easyPieChart").length > 0) {

                    if (jQuery().easyPieChart) {

                        jQuery(".easyPieChart").each(function () {

                            // Set Width
                            var _size = jQuery(this).attr('data-size') || '110';
                            jQuery(this).width(_size);
                            jQuery(this).height(_size);

                            // Render
                            jQuery(this).easyPieChart({

                                easing: jQuery(this).attr('data-easing') || '',
                                barColor: jQuery(this).attr('data-barColor') || '#ef1e25',
                                trackColor: jQuery(this).attr('data-trackColor') || '#dddddd',
                                scaleColor: jQuery(this).attr('data-scaleColor') || '#dddddd',
                                size: jQuery(this).attr('data-size') || '110',
                                lineWidth: jQuery(this).attr('data-lineWidth') || '6',
                                lineCap: 'circle',

                                onStep: function (from, to, percent) {
                                    jQuery(this.el).find('.percent').text(Math.round(percent));
                                }
                            });
                        });
                        defered.resolve();
                    }
                    else {
                        defered.reject();
                    }

                    defered.reject();
                }
            });
            return defered.promise;
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
        service.createStatCharts = createStatCharts;
        return service;
    }


    /// ---------------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// ---------------------------------------------------------------------------------
    chartService.$inject = ['$q', 'PluginsPath'];
    return chartService;

});