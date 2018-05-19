(function () {
    angular
        .module('app.filters', [])
        .filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                return $filter('number')(input * 100, decimals) + '%';
            };
        }])
        .filter('stopWatch', function () {
            return function (input) {
                if (input) {
                    var hours = parseInt(input / 3600000, 10);
                    if (hours < 10) {
                        hours = "0" + hours.toString();
                    }

                    input %= 3600000;

                    var mins = parseInt(input / 60000, 10);
                    if (mins < 10) {
                        mins = "0" + mins.toString();
                    }

                    input %= 60000;

                    var secs = parseInt(input / 1000, 10);
                    if (secs < 10) {
                        secs = "0" + secs.toString();
                    }

                    var ms = input % 1000;
                    return hours + ':' + mins + ':' + secs + ':' + ms;
                }
                return input;
            };
        });
})();