angular.module('app').controller('authController', function ($scope, $http, identity, authService, $location) {

    $scope.identity = identity;

    $scope.login = function (email, password) {

        authService.authenticateUser(email, password).then(function (success) {
            if (success) {
                $location.path("/");
                Messenger().post('You have sucessfully logged in');
            }
            else {
                Messenger().post('invalid email / password');
            }
        });
    };

    $scope.signout = function () {

        authService.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            Messenger().post('You have sucessfully logged out');
            $location.path("/");
        });
    };
});