<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Kevin Xu</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <style type="text/css">
        html,
        body {
            margin: 0;
            padding: 0;
            color: #636b6f;
            font-family: 'Raleway', sans-serif;
            font-weight: 100;
        }
        .m-b-md {
            margin-bottom: 30px;
        }
        .full-height {
            height: 100vh;
        }
        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .position-ref {
            position: relative;
        }
        .content {
            text-align: center;
        }
        .title {
            font-size: 84px;
        }
        .background {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            z-index: 0;
        }
    </style>
    <script src="/js/scripts.npm.js"></script>
    <script src="/js/scripts.bower.js"></script>

    <script src="/js/main.js"></script>
</head>
<body>
    <canvas class="background"></canvas>
    <div class="content flex-center position-ref full-height">
        <div class="title m-b-md">
            Hi Shaina
        </div>
    </div>
    <script src="/js/background.js"></script>
</body>
</html>
