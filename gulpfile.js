process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');

elixir(function(mix) {
    // mix.less('app.less');
    // mix.sass('app.scss');
    mix.scripts(
        [
            'particlesjs/dist/particles.min.js'
        ],
        'public/js/scripts.npm.js',
        'node_modules/'
    );

    mix.scripts(
        [
            'angular/angular.min.js',
            'angular-ui-router/release/angular-ui-router.min.js',
        ],
        'public/js/scripts.bower.js',
        'bower_components/'
    );

    mix.scriptsIn(
        'resources/assets/js/angular',
        'public/js/main.js'
    );

    mix.scripts('background.js');
});