angular.module('app').controller('signupController', function ($scope, userService, $location, authService ) {

    $scope.signup = function () {
        var newUserData = {
            local: {
                email: $scope.email,
                userName: $scope.userName,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            }
        };

        authService.createUser(newUserData).then(function () {
            Messenger().post('User account created!');
            $location.path('/');
        }, function (reason) {
            Messenger().post(reason);
        });
    };
})