require.config({
    //baseUrl: 'js/',
    paths: {
        jquery: 'js/lib/jquery-2.1.3',
        angular: 'js/lib/angular',
        text: 'js/lib/requirejs-plugins/text',
        json: 'js/lib/requirejs-plugins/json'
    },
    shim: {
        'angular': { exports: 'angular' }
    }
});

define(['json!data/CodeStudio.json', 'angular'], function (data, angular) {
    angular.module('CodeStudio', []).controller('explorer', function ($scope) {
        $scope.explorer = data;
        $scope.path = data.path;
        $scope.items = data.pathtree;
    });
});