(function () {
    angular
        .module('app.libs', [])
        .component('libs', {
            controller: LibsController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/libs/libs.html'
        });

    /**
     * Dependency Injection to prevent issues during minification
     * @type {string[]}
     */
    LibsController.$inject = [];

    /**
     * Libaries page controller that handles each individual service/library/module
     *
     * @constructor
     */
    function LibsController() {
        var ctrl = this;
    }
})();