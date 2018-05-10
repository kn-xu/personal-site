(function () {
    angular
        .module('app.factory', [])
        .factory('appFactory', AppFactory)
        .factory('httpFactory', httpFactory);

    /**
     * Small application factory
     *
     * @param $uibModal
     * @returns {{ageApplicationModal: ageApplicationModal, cryptoApplicationModal: cryptoApplicationModal}}
     * @constructor
     */
    function AppFactory($uibModal) {
        return {
            ageApplicationModal: ageApplicationModal,
            cryptoApplicationModal: cryptoApplicationModal,
            reflexApplicationModal: reflexApplicationModal,
            weatherApplicationModal: weatherApplicationModal
        };

        function openModal(controller, template) {
            $uibModal.open({
                size: 'lg',
                controllerAs: 'ctrl',
                controller: controller,
                templateUrl: template
            })
        }

        function ageApplicationModal() {
            openModal(ageAppController, '/views/angular/apps/modals/age.html');
        }

        function cryptoApplicationModal() {
            openModal(cryptoAppController, '/views/angular/apps/modals/crypto.html');
        }

        function reflexApplicationModal() {
            openModal(reflexAppController, '/views/angular/apps/modals/reflex.html');
        }

        function weatherApplicationModal() {
            openModal(weatherAppController, '/views/angular/apps/modals/weather.html');
        }

        /**
         * Age calculator modal controller
         *
         * @param $uibModalInstance
         */
        function ageAppController($uibModalInstance) {
            var ctrl = this;

            ctrl.closeModal = closeModal;
            ctrl.selectTimeMeasurement = selectTimeMeasurement;
            ctrl.calculateAge = calculateAge;
            ctrl.timeMeasurements = [
                {
                    value: 0,
                    displayName: 'Days',
                }, {
                    value: 1,
                    displayName: 'Hours'
                }, {
                    value: 2,
                    displayName: 'Minutes'
                }
            ];
            ctrl.dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

            /**
             * Chooses which time measurement to display
             */
            function selectTimeMeasurement() {
                if (ctrl.selectedTime === undefined || ctrl.selectedTime === 'undefined') {
                    ctrl.selectedTime = ctrl.timeMeasurements[0];
                }

                ctrl.displayTime = ctrl.timeMeasurements[ctrl.selectedTime.value].displayName;

                switch (ctrl.selectedTime.value) {
                    case 0:
                        ctrl.displayAge = ctrl.daysAge;
                        break;
                    case 1:
                        ctrl.displayAge = ctrl.hoursAge;
                        break;
                    case 2:
                        ctrl.displayAge = ctrl.minsAge;
                        break;
                    default:
                        ctrl.displayAge = ctrl.daysAge;
                        break;
                }
            }

            /**
             * Calculates the age of the selected date
             */
            function calculateAge() {
                var currentTime = new Date();
                var difference = currentTime - ctrl.birthday;

                ctrl.daysAge = Math.floor(difference / 86400000);
                ctrl.hoursAge = Math.floor(ctrl.daysAge * 24); // hours
                ctrl.minsAge = Math.round(ctrl.hoursAge * 60); // minutes

                ctrl.displayBirthday = ctrl.birthday.toLocaleString('us-US', ctrl.dateOptions);
                selectTimeMeasurement();
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Crypto price tracker modal controller
         *
         * @param $uibModalInstance
         * @param $q
         * @param httpFactory
         */
        function cryptoAppController($uibModalInstance, $q, httpFactory) {
            var ctrl = this;
            var xAxisMarks = 7;
            var timestampOneDay = 60 * 60 * 24;
            var timestampOneWeek = timestampOneDay * 7;
            var timestampOneMonth = timestampOneWeek * 4;

            ctrl.date = 0;
            ctrl.data = [];
            ctrl.labels = [];
            ctrl.closeModal = closeModal;
            ctrl.initDependencies = initDependencies;
            ctrl.dateSelections = [
                {
                    value: 0,
                    text: 'Last ' + xAxisMarks + ' days'
                }, {
                    value: 1,
                    text: 'Last ' + xAxisMarks + ' weeks'
                }, {
                    value: 2,
                    text: 'Last 28 weeks'
                }
            ];
            ctrl.dateTimestampMapping = {
                0: timestampOneDay,
                1: timestampOneWeek,
                2: timestampOneMonth
            };

            initDependencies();

            /**
             * During page load, inits page with request for bitcoin price
             */
            function initDependencies() {
                ctrl.loading = true;
                ctrl.data = [];

                var timestamps = getTimestamps();
                var promises = getPromises(timestamps);

                $q.all(promises)
                    .then(function(response) {
                        for (var i = 0; i < response.length; i++) {
                            ctrl.data.unshift(response[i].data.BTC.USD);
                        }
                    })
                    .catch(function (response) {
                        ctrl.data = [];
                    })
                    .finally(function (response) {
                        ctrl.loading = false;
                    })
            }

            /**
             * Gets a list of requests with specific timestamps to get bitcoin prices on that timestamp
             *
             * @param timestamps
             * @returns {Array}
             */
            function getPromises(timestamps) {
                var promises = [];
                for (var i = 0; i < timestamps.length; i++) {
                    promises.push(getCryptoPrices(timestamps[i]));
                }
                return promises;
            }

            /**
             *  Gets a list of timestamp available for the requests on the bitcoin prices
             *
             * @returns {Array}
             */
            function getTimestamps() {
                var timestampList = [];
                var currentTimestamp = moment().unix();
                var timeMeasurement = ctrl.dateTimestampMapping[ctrl.date];

                for (var i = 0; i < xAxisMarks; i++) {
                    timestampList.push(currentTimestamp);
                    currentTimestamp -= timeMeasurement;
                }

                getLabels(timestampList);

                return timestampList;
            }

            /**
             * Gets a list of x-axis labels depending on the timestamps
             *
             * @param timestamps
             */
            function getLabels(timestamps) {
                ctrl.labels = [];

                for (var i = 0; i < timestamps.length; i++) {
                    ctrl.labels.unshift(moment.unix(timestamps[i]).format('MM-DD'));
                }
            }

            /**
             * Function the handles the request the api for bitcoin price
             *
             * @param timestamp
             */
            function getCryptoPrices(timestamp) {
                return httpFactory.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + timestamp);
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Reflex testing controller
         *
         * @param $uibModalInstance
         */
        function reflexAppController($uibModalInstance) {
            var ctrl = this;
            var pretestBackgroundColor = '#ffe119';
            var postestBackgroundColor = '#3cb44b';

            ctrl.reflexBtnText = 'Begin';
            ctrl.testing = false;
            ctrl.timer = null;
            ctrl.closeModal = closeModal;
            ctrl.beginTest = beginTest;
            ctrl.finishTest = finishTest;

            /**
             * Begins the test
             */
            function beginTest() {
                ctrl.testing = true;
                ctrl.completedTest = false;

                var randomTime = Math.floor(Math.random() * (4001)) + 1000;

                setTimeout(function() {
                    $('.reflex-canvas').css("background-color", postestBackgroundColor);
                    ctrl.timer = moment();
                }, randomTime);
            }

            /**
             * Ends the testt
             */
            function finishTest() {
                if (!ctrl.testing) {
                    return;
                }

                ctrl.testing = false;
                ctrl.completedTest = true;

                $('.reflex-canvas').css("background-color", pretestBackgroundColor);
                var finishTime = moment();
                ctrl.reflexTime = finishTime - ctrl.timer;

                ctrl.timer = null;
                ctrl.reflexBtnText = 'Try Again?';
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }


        function weatherAppController($uibModalInstance, CONSTANTS, Notification, httpFactory) {
            var ctrl = this;

            ctrl.closeModal = closeModal;
            ctrl.searchWeatherReport = searchWeatherReport;

            ctrl.queryTypes = [
                {
                    value: 0,
                    name: 'City'
                }, {
                    value: 1,
                    name: 'Zip Code'
                }
            ];

            initPage();

            /**
             * Inits the page
             */
            function initPage() {
                ctrl.queryType = ctrl.queryTypes[0].value;
                ctrl.weatherQuery = null;
            }

            /**
             * Http request to get weather information based on either zipcode or city name
             */
            function searchWeatherReport() {
                if (!validated()) {
                    return;
                }

                ctrl.searched = true;
                ctrl.searching = true;

                var baseUrl = "http://api.openweathermap.org/data/2.5/weather";
                var queryParams = {
                    APPID: CONSTANTS.WEATHER.API_KEY
                };

                if (ctrl.queryType === 0) {
                    queryParams.q = ctrl.weatherQuery + ',us';
                } else {
                    queryParams.zip = ctrl.weatherQuery + ',us';
                }

                httpFactory.get(baseUrl, queryParams)
                    .then(function (response) {
                        ctrl.searched = true;
                        ctrl.weatherData = convertData(response.data);
                    })
                    .catch(function (response) {
                        ctrl.searched = false;
                        Notification.error('There was an error getting weather information for ' + ctrl.weatherQuery + '. Please wait 10 minutes and try again. The server detected the error was: ' + response.data.message);
                    })
                    .finally(function (response) {
                        ctrl.searching = false;
                    })
            }

            /**
             * Convert weather data to appropriate view
             *
             * @param data
             */
            function convertData(data) {
                data.main.temp = kelvinToFarenheit(data.main.temp);
                data.main.temp_min = kelvinToFarenheit(data.main.temp_min);
                data.main.temp_max = kelvinToFarenheit(data.main.temp_max);
                data.main.humidity = (data.main.humidity / 100);

                return data;
            }

            /**
             * Converts kelvin to farenheit
             *
             * @param kelvin
             */
            function kelvinToFarenheit(kelvin) {
                return kelvin * (9/5) - 459.67;
            }

            /**
             * Validates the input field to search
             */
            function validated() {
                if (ctrl.queryType === 0) {
                    if (!isNaN(parseFloat(ctrl.weatherQuery)) && !isNaN(ctrl.weatherQuery - 0)) {
                        Notification.error({message: 'Please enter a valid city name.'});
                        return false;
                    }
                }

                if (ctrl.queryType === 1) {
                    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(ctrl.weatherQuery);
                    if (!isValidZip) {
                        Notification.error({message: 'Please enter a valid 5 digit Zip Code.'});
                        return false;
                    }
                }
                return true;
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }
    }

    /**
     * http request factory
     *
     * @param $http
     * @returns {{get: get}}
     */
    function httpFactory($http) {
        return {
            get: get
        }

        /**
         * Get request with optional params
         *
         * @param url
         * @param params
         */
        function get(url, params = null) {
            if (params) {
                return $http.get(url, {params: params});
            } else {
                return $http.get(url);
            }
        }
    }
})();