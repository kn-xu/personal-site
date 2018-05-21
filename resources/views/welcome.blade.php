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
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-lg-2 sidebar">
                <nav class="navbar navbar-default navbar-fixed-side">
                    <div class="container">
                        <div class="navbar-header">
                            <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">
                                <span class="sr-only"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="navbar-collapse collapse" aria-expanded="false">
                            <ul class="nav navbar-nav">
                                <li class>
                                    <a href="" ui-sref="resume">
                                        resume
                                    </a>
                                </li>
                                <li class>
                                    <a href="" ui-sref="apps">
                                        apps
                                    </a>
                                </li>
                                <li class>
                                    <a href="" ui-sref="libs">
                                        libs
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="col-sm-9 col-lg-10 main-view">
                <div class="ui-view-container">
                    <div class="animated-view" ui-view></div>
                </div>
            </div>
        </div>
    </div>
    <canvas class="background"></canvas>
</body>
</html>
