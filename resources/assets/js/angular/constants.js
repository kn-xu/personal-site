(function () {
    angular
        .module('app.constants', [])
        .constant("CONSTANTS", {
            WEATHER: {
                API_KEY: "b23bacd46987fd5b81ac131149305bba",
                ENDPOINT: "https://api.openweathermap.org/data/2.5/weather"
            },
            RPS: {
                ROCK_IMAGE_URL: "https://i.imgur.com/OCubxOA.png",
                PAPER_IMAGE_URL: "https://i.imgur.com/10INGXs.png",
                SCISSORS_IMAGE_URL: "https://i.imgur.com/rJmhrQY.png",
                QUESTION_MARK_IMAGE_URL: 'https://i.imgur.com/09zfMnu.png'
            },
            GIPHY: {
                API_KEY: "4iyE6jzD0vTKH6GByjcvS98oY1zI5Hv5",
                SEARCH_ENDPOINT: "https://api.giphy.com/v1/gifs/search"
            },
            CC: {
                ERRORS: [
                    "Unknown card type",
                    "No card number provided",
                    "Credit card number is in invalid format",
                    "Credit card number is invalid",
                    "Credit card number has an inappropriate number of digits",
                    "Warning! This credit card number is associated with a scam attempt"
                ],
                CARD_TYPES: [
                    {
                        name: "Visa",
                        uiName: 'Visa',
                        length: "13,16",
                        prefixes: "4",
                        checkDigit: true
                    }, {
                        name: "MasterCard",
                        uiName: "Master Card",
                        length: "16",
                        prefixes: "51,52,53,54,55",
                        checkDigit: true
                    }, {
                        name: "DinersClub",
                        uiName: "Diner's Club",
                        length: "14,16",
                        prefixes: "36,38,54,55",
                        checkDigit: true
                    }, {
                        name: "CarteBlanche",
                        uiName: "Carte Blanche",
                        length: "14",
                        prefixes: "300,301,302,303,304,305",
                        checkDigit: true
                    }, {
                        name: "AmEx",
                        uiName: "American Express",
                        length: "15",
                        prefixes: "34,37",
                        checkDigit: true
                    }, {
                        name: "Discover",
                        uiName: "Discover",
                        length: "16",
                        prefixes: "6011,622,64,65",
                        checkDigit: true
                    }, {
                        name: "JCB",
                        uiName: "JCB",
                        length: "16",
                        prefixes: "35",
                        checkDigit: true
                    }, {
                        name: "enRoute",
                        uiName: "enRoute",
                        length: "15",
                        prefixes: "2014,2149",
                        checkDigit: true
                    }, {
                        name: "Solo",
                        uiName: "Solo",
                        length: "16,18,19",
                        prefixes: "6334,6767",
                        checkDigit: true
                    }, {
                        name: "Switch",
                        uiName: "Switch",
                        length: "16,18,19",
                        prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
                        checkDigit: true
                    }, {
                        name: "Maestro",
                        uiName: "Maestro",
                        length: "12,13,14,15,16,18,19",
                        prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
                        checkDigit: true
                    }, {
                        name: "VisaElectron",
                        uiName: "Visa Electron",
                        length: "16",
                        prefixes: "4026,417500,4508,4844,4913,4917",
                        checkDigit: true
                    }, {
                        name: "LaserCard",
                        uiName: "Laser Card",
                        length: "16,17,18,19",
                        prefixes: "6304,6706,6771,6709",
                        checkDigit: true
                    }
                ]
            }
        })
})();
