define(function () {

    function changeTitleRunner($rootScope) {
        /// ---------------------------------------------------------------------------------
        /// Allows us to change the page title dynamically from any controller
        /// Also sets the page sub title
        /// ---------------------------------------------------------------------------------
        $rootScope.page = {
            setTitle: function (title, description) {
                if (title === '') {
                    this.title = 'Charts';
                    this.subTitle = 'Charts';
                }
                else {
                    this.title = 'Charts | ' + title;
                    this.subTitle = title;
                }

                if (description === '') {
                    this.description = 'NO DESCRIPTION GIVEN !!!';
                }
                else {
                    this.description = description;
                }
            }
        };

        /// ---------------------------------------------------------------------------------
        /// Changes the page title dynamically based on the $routeProvider attribute 'title',
        /// if specified in the route config code block in 'core/route-config.js'.
        /// ---------------------------------------------------------------------------------
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.page.setTitle((current.title || ''),(current.description || ''));            
        });

        /// ---------------------------------------------------------------------------------
        /// We need to re-bind some of the features that came with the template after
        /// every view change.
        /// ---------------------------------------------------------------------------------
        $rootScope.$on('$viewContentLoaded', function () {
            Init(false);
        });

    }

    /// ---------------------------------------------------------------------------------
    /// INJECT $rootScope & RETURN RUNNER FUNCTION
    /// ---------------------------------------------------------------------------------
    changeTitleRunner.$inject = ['$rootScope'];
    return changeTitleRunner;
});