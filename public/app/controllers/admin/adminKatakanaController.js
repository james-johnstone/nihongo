angular.module('app').controller('adminKatakanaController', function ($scope, $location, katakanaResource, katakanaService) {

    $scope.kanas = katakanaResource.query();
    
    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.kanas.length / $scope.pageSize);
    }

    $scope.editKana = function (katakana) {
        $location.path("/admin/katakana/" + katakana._id);
    };

    $scope.createKana = function () {
        $location.path("/admin/katakana/new");
    };

    $scope.deleteKana = function (katakana) {
        katakanaService.deleteKatakana(katakana).then(function () {
            $scope.kanas.splice($scope.kanas.indexOf(katakana), 1);
            Messenger().post('Kana successfully deleted');
        }, function (reason) {
            Messenger().post({
                message: reason,
                type: 'error'
            });
        });
    };
})