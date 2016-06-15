define(['json!data/explorer.json', 'angular'], function (explorer, angular) {
    var mod = angular.module('CodeStudio', []);
    mod.controller('explorer', function ($scope) {
        $scope.explorer = explorer;
    });
});