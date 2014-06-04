angular.module('app').controller('adminKatakanaDetailsController', function ($scope, $routeParams, $location, katakanaResource, katakanaService, kanaGroupResource) {

    if (!!$routeParams.id) {
        $scope.kana = katakanaResource.get({ id: $routeParams.id });
    }
    $scope.kanaGroups = kanaGroupResource.query();

    $scope.update = function () {

        if (!!$routeParams.id) {
            katakanaService.updateKatakana($scope.kana).then(function () {
                $location.path('/admin/katakana')
                Messenger().post('Kana details successfully updated');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }

        else {
            katakanaService.createKatakana($scope.kana).then(function () {
                $location.path('/admin/katakana')
                Messenger().post('Kana successfully created');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }
    };

    $scope.cancel = function () {
        $location.path('/admin/katakana');
    };
});