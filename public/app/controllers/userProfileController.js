angular.module('app').controller('userProfileController', function ($scope, authService, identity) {

    $scope.user = angular.copy(identity.currentUser);

    $scope.update = function () {
        authService.updateUser($scope.user).then(function () {
            Messenger().post('Your profile has been successfully updated');
        }, function (reason) {
            Messenger().post(reason);
        });
    }

    $scope.unlinkTwitter = function () {
        $scope.user.twitter = null;
        $scope.update();
    }

    $scope.unlinkGoogle = function () {
        $scope.user.google = null;
        $scope.update();
    }

    $scope.unlinkFacebook = function () {
        $scope.user.facebook = null;
        $scope.update();
    }
})