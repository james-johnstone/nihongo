angular.module('app').controller('adminKanaGroupDetailsController', function ($scope, $routeParams, $location, kanaGroupResource, kanaGroupService) {

    if (!!$routeParams.id) {
        $scope.kanaGroup = kanaGroupResource.get({ id: $routeParams.id });
    }

    $scope.types = ['seion','dakuom','youon']

    $scope.update = function () {

        if (!!$routeParams.id) {
            kanaGroupService.updateKanaGroup($scope.kanaGroup).then(function () {
                $location.path('/admin/kanaGroups')
                Messenger().post('Group details successfully updated');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }

        else {
            kanaGroupService.createKanaGroup($scope.kanaGroup).then(function () {
                $location.path('/admin/kanaGroups')
                Messenger().post('Group successfully created');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }
    };
});