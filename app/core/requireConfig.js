'use strict';

require.config({

    paths: {
        'jquery':  '../../assets/plugins/jquery/jquery-1.12.4',        
        'bootstrap': '../../assets/plugins/bootstrap/js/bootstrap',
        'angular': '../../assets/plugins/angular/angular',
        'angular-route': '../../assets/plugins/angular/angular-route',
        'tmpl': 'tmplFunctions',
        'custom' : 'customFunctions',
        'app': 'app'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'tmpl': {
            deps: ['bootstrap']
        },
        'custom': {
            deps: ['tmpl']
        },
        'angular': {
            deps: ['custom']
        },
        'angular-route' : {
            deps : ['angular']
        },
        'app': {
            deps: ['angular-route']
        }
    }

});


require(['app'], function () {
    angular.bootstrap(document, ['app']);
});

