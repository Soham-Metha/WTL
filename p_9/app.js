var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "login.html",
            controller: "LoginCtrl"
        })
        .when("/register", {
            templateUrl: "register.html",
            controller: "RegisterCtrl"
        })
        .otherwise({
            redirectTo: "/login"
        });
});