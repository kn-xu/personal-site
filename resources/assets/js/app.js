window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
window.onload = function () {
    Particles.init({
        selector: '.background',
        color: '#75A5B7',
        maxParticles: 100,
        sizeVariations: 3,
        speed: 0.4,
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 50
                }
            }, {
                breakpoint: 375,
                options: {
                    maxParticles: 20
                }
            }
        ]
    });
};
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
