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
                ctrl.hashed_id = generateHashId();
                localStorage.setItem('hb', ctrl.hashed_id);
                ctrl.loading = false;
            } else {
                const url = '/api/heartbeats?h=' + ctrl.hashed_id;
                httpFactory.get(url)
                    .then(function(response) {
                        ctrl.heartBeats = response.data;
                        ctrl.heartBeats[0].hb_url = window.location.hostname + '/' + ctrl.heartBeats[0].hb_url;

                        for (var i = 0; i < ctrl.heartBeats[0].hits.length; i++) {
                            ctrl.heartBeats[0].hits[i].info = JSON.parse(ctrl.heartBeats[0].hits[i].info);
                        }
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
            ctrl.loading = true;

            const url = '/api/heartbeats';
            httpFactory.post(
                url,
                {
                    hashed_id: localStorage.getItem('hb')
                },
                {
                    "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr('content')
                })
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
})();