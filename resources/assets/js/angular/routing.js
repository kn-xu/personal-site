(function () {
    angular
        .module('app', [
            'ui.router',
            'ngAnimate',
            'app.smallApps',
            'app.libs',
            'app.directives',
            'app.constants',
            'app.filters',
            'ui.bootstrap',
            'chart.js',
            'ui-notification',
            'oi.select'
        ])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }])
        .config(function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise("");

            $stateProvider
                .state('resume', {
                    url: '/resume',
                    templateUrl: 'views/angular/resume/view.html'
                })
                .state('apps', {
                    url: '/apps',
                    templateUrl: 'views/angular/apps/view.html'
                })
                .state('libs', {
                    url: '/libs',
                    templateUrl: 'views/angular/libs/view.html'
                })

        })
})();