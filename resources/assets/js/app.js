window._ = require('lodash');
try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap-sass');
} catch (e) {}
window.onload = function() {
    Particles.init({
        selector: '.background',
        color: '#75A5B7',
        maxParticles: 50,
        sizeVariations: 5,
        speed: 0.2,
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 80
                }
            }, {
                breakpoint: 375,
                options: {
                    maxParticles: 50
                }
            }
        ]
    });
};
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});