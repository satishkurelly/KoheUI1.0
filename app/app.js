var app = angular.module('portal', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
    $routeProvider.when('/Dashboard', {
        templateUrl: 'Dashboard/main.html',
        controller: 'MainCtrl'
    });
    $routeProvider.when('/resetPwd', {
        templateUrl: 'resetpassword/resetpassword.html',
       // controller: 'ResetController'
    });
    $routeProvider.otherwise({ redirectTo: '/login' });
});
app.run(function(authentication, $rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(evt) {
       // if(!authentication.isAuthenticated){
          //  $location.url("/login");
       // }
       // event.preventDefault();
    });
})

app.controller('LoginCtrl', function($scope, $http, $location, authentication) {
    $scope.login = function() {

        var username = $scope.username;

        $http({
            method: 'GET',
            url: 'http://localhost:8086/Project/Rest/timeportal/login?username=' +username
        }).then(function successCallback(response) {
            var Results = angular.fromJson(response.data)[0];

            var userName = Results.username;
            var role = Results.role;
            var passWord = Results.password;

            if ($scope.username === userName && $scope.password === passWord) {

                console.log('successful')
                authentication.isAuthenticated = true;
                authentication.user = { name: $scope.username };
                $location.url("/Dashboard");
            } else {
                $scope.loginError = "Invalid username/password combination";
                console.log('Login failed..');
            };

        }, function errorCallback(response) {

        });


    };
});

app.controller('AppCtrl', function($scope, $httpBackend, $http, authentication) {
    $scope.templates =
        [
            { url: 'login.html' },
            { url: 'home.html' }
        ];

    $scope.template = $scope.templates[0];
    $scope.login = function (username, password) {
        if ( username === 'admin' && password === '1234') {


            authentication.isAuthenticated = true;
            $scope.template = $scope.templates[1];
            $scope.user = username;
        } else {
            $scope.loginError = "Invalid username/password combination";
        };
    };

});

app.controller('MainCtrl', function($scope, authentication) {
    $scope.username = authentication.username;

});

app.factory('authentication', function() {
    return {
        isAuthenticated: false,
        user: null
    }
});