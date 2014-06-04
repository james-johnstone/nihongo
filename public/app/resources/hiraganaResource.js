angular.module('app').factory('hiraganaResource', function ($resource) {

    var kanaResources = $resource('/api/hiragana/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return kanaResources;
})

angular.module('app').factory('hiraganaService', function ($http, identity, $q, hiraganaResource) {
    return {
        updateHiragana: function (hiraganaData) {
            var defer = $q.defer();
            var clone = new hiraganaResource();

            angular.extend(clone, hiraganaData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        createHiragana: function (hiraganaData) {

            var newHiragana = new hiraganaResource(hiraganaData);
            var defer = $q.defer();

            newHiragana.$save().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        deleteHiragana: function (hiragana) {
            var defer = $q.defer();
            var clone = new hiraganaResource();

            angular.extend(clone, hiragana);

            clone.$delete({ id: hiragana._id }).then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})