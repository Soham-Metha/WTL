app.controller("RegisterCtrl", function ($scope, $location) {
    $scope.user = {};
    console.log("1",$scope.user);

    $scope.register = function () {
        console.log($scope.user);
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        localStorage.setItem("user", JSON.stringify($scope.user));
        alert("Registration successful!");
        $location.path("/login");
    };
});

app.controller("LoginCtrl", function ($scope, $location) {
    $scope.loginData = {};

    $scope.login = function () {
        var storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            alert("No user found. Please register.");
            return;
        }

        if ($scope.loginData.email === storedUser.email &&
            $scope.loginData.password === storedUser.password) {
            alert("Login successful!");
        } else {
            alert("Invalid credentials!");
        }
    };
});