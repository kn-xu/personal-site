(function () {
    angular
        .module('app.smallApps', [
            'app.factory'
        ])
        .component('smallApps', {
            controller: AppsController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/apps/apps.html'
        });

    /**
     * Dependency Injection to prevent issues during minification
     * @type {string[]}
     */
    AppsController.$inject = ['appFactory'];

    /**
     * Apps page controller that handles each individual application
     *
     * @param appFactory
     * @constructor
     */
    function AppsController(appFactory) {
        var ctrl = this;

        ctrl.openApp = openApp;
        ctrl.applicationModalMapping = {
            'daysOfAge': appFactory.ageApplicationModal,
            'cryptoTracker': appFactory.cryptoApplicationModal,
            'reflexTester': appFactory.reflexApplicationModal,
            'weatherReport': appFactory.weatherApplicationModal
        };
        ctrl.applicationList = [
            {
                name: 'daysOfAge',
                description: 'How many days/min/seconds old are you?'
            },
            {
                name: 'cryptoTracker',
                description: 'Bitcoin Price Tracker'
            },
            {
                name: 'reflexTester',
                description: 'Reflex Tester'
            },
            {
                name: 'weatherReport',
                description: 'Weather Reporter'
            }
        ];

        /**
         * Opens the modal for the application listed
         *
         * @param applicationName
         */
        function openApp(applicationName) {
            ctrl.applicationModalMapping[applicationName]();
        }
    }
})();