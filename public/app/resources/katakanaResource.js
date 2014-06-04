angular.module('app').factory('katakanaResource', function ($resource) {

    var kanaResources = $resource('/api/katakana/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return kanaResources;
})

angular.module('app').factory('katakanaService', function ($http, identity, $q, katakanaResource) {
    return {
        updateKatakana: function (katakanaData) {
            var defer = $q.defer();
            var clone = new katakanaResource();

            angular.extend(clone, katakanaData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        createKatakana: function (katakanaData) {

            var newKatakana = new katakanaResource(katakanaData);
            var defer = $q.defer();

            newKatakana.$save().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        deleteKatakana: function (katakana) {
            var defer = $q.defer();
            var clone = new katakanaResource();

            angular.extend(clone, katakana);

            clone.$delete({ id: katakana._id }).then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})