angular.module('app').controller('adminKanaGroupController', function ($scope, $location, kanaGroupResource, kanaGroupService) {

    $scope.kanaGroups = kanaGroupResource.query();

    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.kanaGroups.length / $scope.pageSize);
    }

    $scope.editKanaGroup = function (kanaGroup) {
        $location.path("/admin/kanaGroup/" + kanaGroup._id);
    };

    $scope.createGroup = function () {
        $location.path("/admin/kanaGroup/new");
    };

    $scope.deleteKanaGroup = function (kanaGroup) {
        kanaGroupService.deleteKanaGroup(kanaGroup).then(function () {
            $scope.kanaGroups.splice($scope.kanaGroups.indexOf(kanaGroup), 1);
            Messenger().post('Kana successfully deleted');
        }, function (reason) {
            Messenger().post({
                message: reason,
                type: 'error'
            });
        });
    };
})