(function () {
    angular
        .module('app', [
            'ui.router',
            'ngAnimate',
            'app.smallApps',
            'app.directives',
            'app.constants',
            'app.filters',
            'ui.bootstrap',
            'chart.js',
            'ui-notification'
        ])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }])
        .config(function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise("");

            $stateProvider
                .state('home', {
                    url: '',
                    abstract: true
                })
                    .state('home.resume', {
                        url: '/resume',
                        templateUrl: 'views/angular/resume/view.html'
                    })
                    .state('home.apps', {
                        url: '/apps',
                        templateUrl: 'views/angular/apps/view.html'
                    })
                    .state('home.apps.age', {
                        url: '/age',
                        templateUrl: 'views/angular/apps/age.html'
                    })

        })
})();