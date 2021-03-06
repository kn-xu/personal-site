'use strict';

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
            'node_modules/figlet/lib/figlet.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.js',
            'node_modules/oi.select/dist/select-tpls.js',
            'node_modules/hashids/dist/hashids.min.js',
            'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
            'bower_components/d3/d3.min.js',
            'node_modules/particlesjs/dist/particles.min.js',
            'node_modules/clipboard/dist/clipboard.js',
            'node_modules/ngclipboard/dist/ngclipboard.js',
            'bower_components/moment/min/moment-with-locales.min.js'
        ], 'public/js/library.js'
    )
    .sass('resources/assets/sass/app.scss', 'public/css')
    .combine(
        [
            'resources/assets/js/angular/**/*.js'
        ],
        'public/js/custom.js'
    )
    .copy('node_modules/figlet/fonts/Standard.flf', 'public/fonts/Standard.flf')
    .copyDirectory('resources/views/angular', 'public/views/angular')
    .copyDirectory('resources/assets/imgs', 'public/imgs');
