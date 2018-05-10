let mix = require('laravel-mix');
mix.disableNotifications();

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .combine(
        [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/chart.js/dist/chart.js',
            'node_modules/angular-chart.js/dist/angular-chart.js',
            'node_modules/oi.select/dist/select-tpls.js',
            'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
            'bower_components/d3/d3.min.js',
            'node_modules/particlesjs/dist/particles.min.js',
            'bower_components/moment/min/moment.min.js'
        ], 'public/js/library.js'
    )
    .sass('resources/assets/sass/app.scss', 'public/css')
    .combine(
        [
            'resources/assets/js/angular/**/*.js'
        ],
        'public/js/custom.js'
    )
    .copyDirectory('resources/views/angular', 'public/views/angular');
