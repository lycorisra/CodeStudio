define(['json!data/explorer.json', 'angular'], function (explorer, angular) {
    var mod = angular.module('CodeStudio', []);
    mod.controller('explorer', function ($scope) {
        $scope.explorer = explorer;
        $scope.isShow = true;
        $scope.toggleExplorer = function () {
            $scope.isShow = true;
        };
        $scope.content = 'hello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello world';
    });
});