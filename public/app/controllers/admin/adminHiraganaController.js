angular.module('app').controller('adminHiraganaController', function ($scope, $location, hiraganaResource, hiraganaService) {

    $scope.kanas = hiraganaResource.query();
    
    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.kanas.length / $scope.pageSize);
    }

    $scope.editKana = function (hiragana) {
        $location.path("/admin/hiragana/" + hiragana._id);
    };

    $scope.createKana = function () {
        $location.path("/admin/hiragana/new");
    };

    $scope.deleteKana = function (hiragana) {
        hiraganaService.deleteHiragana(hiragana).then(function () {
            $scope.kanas.splice($scope.kanas.indexOf(hiragana), 1);
            Messenger().post('Kana successfully deleted');
        }, function (reason) {
            Messenger().post({
                message: reason,
                type: 'error'
            });
        });
    };
})