(function () {
    angular
        .module('app.factory', [])
        .factory('appFactory', AppFactory)
        .factory('httpFactory', httpFactory)
        .factory('ErrorFactory', ErrorFactory)
        .factory('ValidationFactory', ValidationFactory);

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
            weatherApplicationModal: weatherApplicationModal,
            rpsApplicationModal: rpsApplicationModal,
            primeFactorsApplicationModal: primeFactorsApplicationModal,
            clockApplicationModal: clockApplicationModal,
            giphyApplicationModal: giphyApplicationModal,
            stopWatchApplicationModal: stopWatchApplicationModal,
            ccApplicationModal: ccApplicationModal,
            ipApplicationModal: ipApplicationModal
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

        function rpsApplicationModal() {
            openModal(rpsAppController, '/views/angular/apps/modals/rps.html');
        }

        function primeFactorsApplicationModal() {
            openModal(primeFactorsAppController, '/views/angular/apps/modals/prime.html');
        }

        function clockApplicationModal() {
            openModal(clockAppController, '/views/angular/apps/modals/clock.html');
        }

        function giphyApplicationModal() {
            openModal(giphyAppController, '/views/angular/apps/modals/giphy.html');
        }

        function stopWatchApplicationModal() {
            openModal(stopWatchAppController, '/views/angular/apps/modals/stopwatch.html');
        }

        function ccApplicationModal() {
            openModal(ccAppController, '/views/angular/apps/modals/cc.html');
        }

        function ipApplicationModal() {
            openModal(ipAppController, '/views/angular/apps/modals/ip.html');
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
                    .then(function (response) {
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

                setTimeout(function () {
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

        /**
         * Weather report controller
         *
         * @param $uibModalInstance
         * @param CONSTANTS
         * @param Notification
         * @param httpFactory
         */
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

                var queryParams = {
                    APPID: CONSTANTS.WEATHER.API_KEY
                };

                if (ctrl.queryType === 0) {
                    queryParams.q = ctrl.weatherQuery + ',us';
                } else {
                    queryParams.zip = ctrl.weatherQuery + ',us';
                }

                httpFactory.get(CONSTANTS.WEATHER.ENDPOINT, queryParams)
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
                return kelvin * (9 / 5) - 459.67;
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

        /**
         * Rock Paper Scissors controller
         *
         * @param $uibModalInstance
         * @param CONSTANTS
         * @param Notification
         */
        function rpsAppController($uibModalInstance, CONSTANTS, Notification) {
            var ctrl = this;

            var ROCK_VALUE = 0;
            var PAPER_VALUE = 1;
            var SCISSORS_VALUE = 2;
            var WIN = 0;
            var LOSS = 1;
            var rpsImageMapping = {
                0: CONSTANTS.RPS.ROCK_IMAGE_URL,
                1: CONSTANTS.RPS.PAPER_IMAGE_URL,
                2: CONSTANTS.RPS.SCISSORS_IMAGE_URL
            };

            ctrl.aiChoiceUrl = CONSTANTS.RPS.QUESTION_MARK_IMAGE_URL;
            ctrl.rps = [
                {
                    value: ROCK_VALUE,
                    imageUrl: CONSTANTS.RPS.ROCK_IMAGE_URL
                },
                {
                    value: PAPER_VALUE,
                    imageUrl: CONSTANTS.RPS.PAPER_IMAGE_URL
                },
                {
                    value: SCISSORS_VALUE,
                    imageUrl: CONSTANTS.RPS.SCISSORS_IMAGE_URL
                }
            ];
            ctrl.score = {
                ai: 0,
                user: 0
            };
            ctrl.makeChoice = makeChoice;
            ctrl.closeModal = closeModal;

            /**
             * Randomly select a choice for the AI
             *
             * @returns {number}
             */
            function aiMakeChoice() {
                return Math.floor((Math.random() * ctrl.rps.length));
            }

            /**
             * Decide who wins the game
             *
             * @param choice
             */
            function makeChoice(choice) {
                choice = parseInt(choice);
                var aiChoice = aiMakeChoice();
                var verdict = undefined;

                ctrl.aiChoiceUrl = rpsImageMapping[aiChoice];

                if (aiChoice === choice) {
                    Notification.info('It was a tie!');
                    revertAiChoice();
                    return;
                }

                switch (choice) {
                    case 0:
                        if (aiChoice === PAPER_VALUE) {
                            verdict = LOSS;
                        } else if (aiChoice === SCISSORS_VALUE) {
                            verdict = WIN;
                        }
                        break;
                    case 1:
                        if (aiChoice === ROCK_VALUE) {
                            verdict = WIN;
                        } else if (aiChoice === SCISSORS_VALUE) {
                            verdict = LOSS;
                        }
                        break;
                    case 2:
                        if (aiChoice === PAPER_VALUE) {
                            verdict = WIN;
                        } else if (aiChoice === ROCK_VALUE) {
                            verdict = LOSS;
                        }
                        break;
                    default:
                        Notification.error('Something went wrong. Please try playing again!');
                        return;
                }

                if (verdict === WIN) {
                    Notification.success('Congrats, you win this round!');
                    ctrl.score.user++;
                } else if (verdict === LOSS) {
                    Notification.warning('Sorry, the AI got the best of you!');
                    ctrl.score.ai++;
                }

                revertAiChoice();
            }

            /**
             * Changes the AI choice image back to a question mark after 1 second
             */
            function revertAiChoice() {
                setTimeout(function () {
                    ctrl.aiChoiceUrl = CONSTANTS.RPS.QUESTION_MARK_IMAGE_URL;
                }, 1000);
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Prime Factor Controller
         *
         * @param $uibModalInstance
         */
        function primeFactorsAppController($uibModalInstance) {
            var ctrl = this;

            ctrl.closeModal = closeModal;
            ctrl.findPrimeFactors = findPrimeFactors;

            /**
             * Process to determine how many prime factors a number has
             *
             * @param userInput
             */
            function findPrimeFactors() {
                ctrl.computedNumber = angular.copy(ctrl.input.number);
                ctrl.computing = true;
                ctrl.input.primeFactors = isPrimeFactory(parseInt(ctrl.input.number));
                ctrl.computing = false;
            }

            /**
             * Algorithm to decide how many prime factors are in a given input number
             *
             * @param number
             * @returns {number}
             */
            function isPrimeFactory(number) {
                ctrl.input.primeFactoryList = [];
                for (var i = 2; i <= number; i++) {
                    while ((number % i) === 0) {
                        ctrl.input.primeFactoryList.push(i);
                        number /= i;
                    }
                }
                ctrl.input.primeFactoryList = ctrl.input.primeFactoryList.filter(onlyUnique);
                return ctrl.input.primeFactoryList.length;
            }

            /**
             * Filter function to get unique values
             *
             * @param value
             * @param index
             * @param self
             * @returns {boolean}
             */
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Digital ASCII clock controller
         *
         * @param $scope
         * @param $uibModalInstance
         * @param Notification
         * @param $interval
         */
        function clockAppController($scope, $uibModalInstance, Notification, $interval) {
            var ctrl = this;

            ctrl.closeModal = closeModal;

            initTime();
            $interval(initTime.bind(this), 1000);

            /**
             * Sets the time into ASCII
             */
            function initTime() {
                figlet(moment().format('hh:mm:ss a'), 'Standard', function (err, text) {
                    if (err) {
                        Notification.error(err);
                        return;
                    }
                    ctrl.time = text;
                });
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Giphy App Controller
         *
         * @param $uibModalInstance
         * @param httpFactory
         * @param CONSTANTS
         * @param Notification
         */
        function giphyAppController($uibModalInstance, httpFactory, CONSTANTS, Notification) {
            var ctrl = this;

            ctrl.closeModal = closeModal;
            ctrl.search = search;

            /**
             * Searches gifs using public giphy api
             */
            function search() {
                if (!ctrl.giphySearch || ctrl.giphySearch === undefined || ctrl.giphySearch === 'undefined') {
                    Notification.error('Please enter a keyword you want to search giphy for.');
                }
                ;

                if (ctrl.giphySearch.length < 3) {
                    Notification.error('Please enter a keyword longer than 2 letters.');
                }
                ;

                ctrl.searching = true;
                var queryParams = {
                    q: ctrl.giphySearch,
                    api_key: CONSTANTS.GIPHY.API_KEY,
                    limit: 10,
                    offset: 0,
                    lang: 'en',
                    rating: 'PG-13'
                };

                httpFactory.get(CONSTANTS.GIPHY.SEARCH_ENDPOINT, queryParams)
                    .then(function (response) {
                        ctrl.searched = true;
                        ctrl.giphyData = response.data.data;

                        if (!response.data.data.length) {
                            Notification.info('Sorry, there were no gifs related to ' + ctrl.giphySearch);
                        }
                    })
                    .catch(function (response) {
                        ctrl.searched = false;
                        Notification.error('There was an error getting gifs from giphy, please try again later.');
                    })
                    .finally(function (response) {
                        ctrl.searching = false;
                    })
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Stop watch Controller
         *
         * @param $uibModalInstance
         * @param $interval
         */
        function stopWatchAppController($uibModalInstance, $interval) {
            var ctrl = this;

            ctrl.startTime = null;
            ctrl.elapsedTime = 0;
            ctrl.runningTime = 0;

            ctrl.closeModal = closeModal;
            ctrl.start = start;
            ctrl.stop = stop;
            ctrl.reset = reset;

            /**
             * Starts the stop watch
             */
            function start() {
                if (ctrl.startTime === null) {
                    ctrl.startTime = moment();

                    ctrl.running = $interval(function () {
                        ctrl.runningTime = moment() - ctrl.startTime;
                    }, 70);
                }
            };

            /**
             * Stops the stop watch
             */
            function stop() {
                // If not started, stop button should do nothing
                if (ctrl.startTime === null) {
                    return;
                }

                if (ctrl.running) {
                    // Cancel the setInterval function
                    $interval.cancel(ctrl.running);
                    ctrl.elapsedTime += ctrl.runningTime;
                    ctrl.startTime = null;
                    ctrl.runningTime = 0;
                }
            };

            /**
             * Resets
             */
            function reset() {
                if (ctrl.running) {
                    $interval.cancel(ctrl.running);
                }
                ctrl.elapsedTime = 0;
                ctrl.runningTime = 0;
                ctrl.startTime = null;
            };

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * Credit Card Validator App Controller
         *
         * @param $uibModalInstance
         * @param Notification
         * @param ValidationFactory
         * @param ErrorFactory
         * @param CONSTANTS
         */
        function ccAppController($uibModalInstance, Notification, ValidationFactory, ErrorFactory, CONSTANTS) {
            var ctrl = this;

            ctrl.cardTypes = CONSTANTS.CC.CARD_TYPES;
            ctrl.valid = true;

            ctrl.closeModal = closeModal;
            ctrl.validateCreditCard = validateCreditCard;

            /**
             * Validates credit card information
             */
            function validateCreditCard() {
                if (ValidationFactory.creditCard(ctrl.creditCardNumber, ctrl.creditCardType)) {
                    Notification.success('This credit card is valid!');
                    ctrl.valid = true;
                } else {
                    ctrl.valid = false;
                }
            }

            /**
             * Closes the modal
             */
            function closeModal() {
                $uibModalInstance.close();
            }
        }

        /**
         * User IP App Controller
         *
         * @param $uibModalInstance
         * @param httpFactory
         * @param $q
         * @param ErrorFactory
         */
        function ipAppController($uibModalInstance, httpFactory, $q, ErrorFactory) {
            var ctrl = this;

            ctrl.loading = true;
            ctrl.closeModal = closeModal;

            initDependencies();

            function initDependencies() {
                var promises = [
                    httpFactory.get('/api/user')
                ];

                $q.all(promises)
                    .then(function(response) {
                        ctrl.userInfo = response[0].data.data;
                        ctrl.loading = false;
                    })
                    .catch(function(response) {
                        ErrorFactory.error('There was an error getting your IP. Please try again later.');
                    })
                    .then(function(response) {
                        ctrl.loading = false;
                    })
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
        };

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

    /**
     * Validation Factory for testing of user inputs
     *
     * @param CONSTANTS
     * @param ErrorFactory
     * @returns {{creditCard: creditCard}}
     * @constructor
     */
    function ValidationFactory(CONSTANTS, ErrorFactory) {
        return {
            creditCard: creditCard
        };

        function creditCard(creditCardNumber, creditCardName) {
            var cardType = -1, ccErrorNo;

            // Match up the selected Card Name
            for (var i = 0; i < CONSTANTS.CC.CARD_TYPES.length; i++) {
                if (creditCardName.toLowerCase() == CONSTANTS.CC.CARD_TYPES[i].name.toLowerCase()) {
                    cardType = i;
                    break;
                }
            }

            // If card type not found, report an error
            if (cardType === -1) {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[0]);
                return false;
            }

            // Ensure that the user has provided a credit card number
            if (creditCardNumber.length === 0) {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[1]);
                return false;
            }

            // Now remove any spaces from the credit card number
            creditCardNumber = creditCardNumber.replace(/\s/g, "");

            // Check that the number is numeric
            var cardNo = angular.copy(creditCardNumber);
            var cardRegEx = /^[0-9]{13,19}$/;
            if (!cardRegEx.exec(cardNo)) {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[2]);
                return false;
            }

            // Now check the modulus 10 check digit - if required
            if (CONSTANTS.CC.CARD_TYPES[cardType].checkDigit) {
                var checksum = 0;
                var j = 1;

                // Process each digit one by one starting at the right
                var calc;
                for (i = cardNo.length - 1; i >= 0; i--) {

                    // Extract the next digit and multiply by 1 or 2 on alternative digits.
                    calc = Number(cardNo.charAt(i)) * j;

                    // If the result is in two digits add 1 to the checksum total
                    if (calc > 9) {
                        checksum = checksum + 1;
                        calc = calc - 10;
                    }

                    // Add the units element to the checksum total
                    checksum = checksum + calc;

                    // Switch the value of j
                    if (j === 1) {
                        j = 2
                    } else {
                        j = 1
                    }
                }

                // All done - if checksum is divisible by 10, it is a valid modulus 10.
                // If not, report an error.
                if (checksum % 10 !== 0) {
                    ErrorFactory.error(CONSTANTS.CC.ERRORS[3]);
                    return false;
                }
            }

            // Check it's not a spam number
            if (cardNo === '5490997771092064') {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[5]);
                return false;
            }

            // The following are the card-specific checks we undertake.
            var LengthValid = false;
            var PrefixValid = false;

            // Load an array with the valid prefixes for this card
            var prefix = CONSTANTS.CC.CARD_TYPES[cardType].prefixes.split(",");

            // Now see if any of them match what we have in the card number
            for (i = 0; i < prefix.length; i++) {
                var exp = new RegExp("^" + prefix[i]);
                if (exp.test(cardNo)) PrefixValid = true;
            }

            // If it isn't a valid prefix there's no point at looking at the length
            if (!PrefixValid) {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[3]);
                return false;
            }

            // See if the length is valid for this card
            var lengths = CONSTANTS.CC.CARD_TYPES[cardType].length.split(",");
            for (j = 0; j < lengths.length; j++) {
                if (cardNo.length === parseInt(lengths[j])) LengthValid = true;
            }

            // See if all is OK by seeing if the length was valid
            if (!LengthValid) {
                ErrorFactory.error(CONSTANTS.CC.ERRORS[4]);
                return false;
            }

            // The credit card is in the required format.
            return true;
        }
    }

    /**
     * Error Factory
     *
     * @param Notification
     * @returns {{error: error}}
     * @constructor
     */
    function ErrorFactory(Notification) {
        return {
            error: error
        }

        /**
         * Throws notification error
         *
         * @param errorMessage
         */
        function error(errorMessage) {
            Notification.error(errorMessage);
        }
    }
})();