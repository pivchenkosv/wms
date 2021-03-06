<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">--}}
    <title>WMS</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
{{--    <link--}}
{{--            rel="stylesheet"--}}
{{--            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"--}}
{{--    />--}}
    {{--<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>--}}
    {{--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">--}}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    {{--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>--}}
</head>
<body>
<div id="content">
    {{--<nav class="navbar navbar-expand-md navbar-light navbar-laravel">--}}
        {{--<div class="container">--}}
            {{--<a class="navbar-brand" href="{{ url('/') }}">--}}
                {{--{{ config('app.name', 'WMS') }} React--}}
            {{--</a>--}}
            {{--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"--}}
                    {{--aria-controls="navbarSupportedContent" aria-expanded="false"--}}
                    {{--aria-label="{{ __('Toggle navigation') }}">--}}
                {{--<span class="navbar-toggler-icon"></span>--}}
            {{--</button>--}}

            {{--<div class="collapse navbar-collapse" id="navbarSupportedContent">--}}
                {{--<!-- Left Side Of Navbar -->--}}
                {{--<ul class="navbar-nav mr-auto">--}}

                {{--</ul>--}}

                {{--<!-- Right Side Of Navbar -->--}}
                {{--<ul class="navbar-nav ml-auto">--}}
                    {{--<!-- Authentication Links -->--}}
                    {{--@guest--}}
                        {{--<li class="nav-item">--}}
                            {{--<a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>--}}
                        {{--</li>--}}
                    {{--@else--}}
                        {{--<li class="nav-item dropdown">--}}
                            {{--<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"--}}
                               {{--data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>--}}
                                {{--{{ Auth::user()->name }} <span class="caret"></span>--}}
                            {{--</a>--}}

                            {{--<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">--}}
                                {{--@if(Auth::user()->role != 'ROLE_WORKER')--}}
                                    {{--<a class="dropdown-item" href="/admin/users">--}}
                                        {{--{{ __('Users') }}--}}
                                    {{--</a>--}}
                                    {{--<a class="dropdown-item" href="/reports">--}}
                                        {{--{{ __('Reports') }}--}}
                                    {{--</a>--}}
                                {{--@endif--}}
                                {{--<a class="dropdown-item" href="/tasks">--}}
                                    {{--{{ __('Tasks') }}--}}
                                {{--</a>--}}
                                {{--<a class="dropdown-item" href="/cells">--}}
                                    {{--{{ __('Cells') }}--}}
                                {{--</a>--}}
                                {{--<a class="dropdown-item" href="/stocks">--}}
                                    {{--{{ __('Stocks') }}--}}
                                {{--</a>--}}
                                {{--<a class="dropdown-item" href="/products">--}}
                                    {{--{{ __('Products') }}--}}
                                {{--</a>--}}
                                {{--<a class="dropdown-item" href="{{ route('logout') }}"--}}
                                   {{--onclick="event.preventDefault();--}}
                                                     {{--document.getElementById('logout-form').submit();">--}}
                                    {{--{{ __('Logout') }}--}}
                                {{--</a>--}}

                                {{--<form id="logout-form" action="{{ route('logout') }}" method="POST"--}}
                                      {{--style="display: none;">--}}
                                    {{--@csrf--}}
                                {{--</form>--}}
                            {{--</div>--}}
                        {{--</li>--}}
                    {{--@endguest--}}
                {{--</ul>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</nav>--}}

    {{--<div id="content"></div>--}}
</div>
<script src="{{ asset('js/app.js') }}"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
{{--<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css">--}}
{{--<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">--}}

</body>
</html>
