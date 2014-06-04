angular.module('app').factory('kanaGroupResource', function ($resource) {

    var kanaResources = $resource('/api/kanaGroup/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return kanaResources;
})

angular.module('app').factory('kanaGroupService', function ($http, identity, $q, kanaGroupResource) {
    return {
        updateKanaGroup: function (kanaGroupData) {
            var defer = $q.defer();
            var clone = new kanaGroupResource();

            angular.extend(clone, kanaGroupData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        createKanaGroup: function (kanaGroupData) {

            var newKanaGroup = new kanaGroupResource(kanaGroupData);
            var defer = $q.defer();

            newKanaGroup.$save().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        deleteKanaGroup: function (kanaGroup) {
            var defer = $q.defer();
            var clone = new kanaGroupResource();

            angular.extend(clone, kanaGroup);

            clone.$delete({ id: kanaGroup._id }).then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})