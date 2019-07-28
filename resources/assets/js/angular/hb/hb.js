(function () {
    angular
        .module('app.hb', [])
        .component('heartBeats', {
            controller: HBController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/hb/hb.html'
        });

    /**
     * Dependency Injection to prevent issues during minification
     * @type {string[]}
     */
    HBController.$inject = [];

    /**
     * Heart beats controller on page
     *
     * @constructor
     */
    function HBController() {
        var ctrl = this;
    }
})();