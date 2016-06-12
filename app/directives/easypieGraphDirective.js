define(function () {

    function easypieGraph() {
        return {
            restrict: "EA",
            scope: {
                datasource: '='
            },
            templateUrl: 'views/partials/easypieGraph.html'
        };
    }

    /// --------------------------------------------------------------------------
    /// RETURN DIRECTIVE OBJECT
    /// --------------------------------------------------------------------------
    return easypieGraph;
});