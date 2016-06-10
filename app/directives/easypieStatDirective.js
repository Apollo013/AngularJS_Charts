define(function () {

    function easypieStat($compile) {
        return {
            restrict: 'EA',
            scope: {
                datasource: '='
            },
            templateUrl:'views/partials/easypieStat.html'
        };
    };


    /// --------------------------------------------------------------------------
    /// INJECT ANGULAR MODULES & RETURN SERVICE FUNCTION
    /// --------------------------------------------------------------------------
    easypieStat.$inject = ['$compile'];
    return easypieStat;
});