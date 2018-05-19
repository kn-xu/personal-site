<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/" />
    <title>Kevin Xu</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link rel="stylesheet" href="/css/app.css">

    <!-- Scripts -->
    <!-- Imported Assets via bower/npm -->
    <script src="/js/app.js"></script>
    <script src="/js/library.js"></script>

    <!-- Self-wrote JS code on Angular -->
    <script src="/js/custom.js"></script>
</head>
<body>
<div id="wrapper">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li class="sidebar-brand">
                <a href="" ui-sref="home.resume">
                    resume
                </a>
            </li>
            <li class="sidebar-brand">
                <a href="" ui-sref="home.apps">
                    apps
                </a>
            </li>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div ui-view></div>
        </div>
    </div>
</div>
    <canvas class="background"></canvas>
</body>
</html>
