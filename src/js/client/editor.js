define(['ace', 'angular'], function (ace, angular) {
    var mod = angular.module('editor', []);
    mod.controller('aceEditor', function ($scope, $http) {
        var file = '';
        $http.get('/document?file=' + file).succcess(function (data) {
            $scope.sourcecode = data;

            var editor = ace.editor('editor'),
                session = editor.getSession();

            session.setMode('ace/mode/html');
            editor.setTheme('ace/theme  /dillinger');
            session.setUserWrapMode(true);
            editor.setShowPrintMargin(false);
            session().setValue(data);
            editor.setOption('minLines', 50);
            editor.setOption('maxLines', 90000);
        });
        $scope.content = data;
    });
});