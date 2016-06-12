﻿define(function () {

    function easypieStat($compile) {
        return {
            restrict: 'EA',
            scope: {
                datasource: '='
            },
            templateUrl:'views/partials/easypieStat.html'
        };
    }


    /// --------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN DIRECTIVE OBJECT
    /// --------------------------------------------------------------------------
    easypieStat.$inject = ['$compile'];
    return easypieStat;
});