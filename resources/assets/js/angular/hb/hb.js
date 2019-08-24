(function () {
    angular
        .module('app.hb', [
            'app.factory'
        ])
        .component('heartBeats', {
            controller: HBController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/hb/hb.html'
        });

    /**
     * Dependency Injection to prevent issues during minification
     * @type {string[]}
     */
    HBController.$inject = ['httpFactory'];

    /**
     * @constructor
     */
    function HBController(httpFactory) {
        var ctrl = this;
        ctrl.hashed_id = localStorage.getItem('hb');
        ctrl.heartBeats = [];
        ctrl.loading = true;

        ctrl.addHb = addHeartBeat;

        init();

        function init() {
            if (!ctrl.hashed_id) {
                localStorage.setItem('hb', generateHashId());
                ctrl.loading = false;
            } else {
                const url = '/api/heartbeats?h=' + ctrl.hashed_id;
                httpFactory.get(url)
                    .then(function(response) {
                        ctrl.heartBeats = response.data;
                    })
                    .catch(function(response) {

                    })
                    .finally(function(response) {
                        ctrl.loading = false;
                    })
            }
        }

        function generateHashId() {
            return "_" + Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
        }

        function addHeartBeat() {

        }
    }
})();