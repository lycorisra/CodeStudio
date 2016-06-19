require.config({
    //baseUrl: 'js/',
    paths: {
        jquery: 'js/lib/jquery-2.1.3',
        angular: 'js/lib/angular',
        ace: 'js/lib/ace/src/',
        text: 'js/lib/requirejs-plugins/text',
        json: 'js/lib/requirejs-plugins/json'
    },
    shim: {
        'angular': { exports: 'angular' }
    }
});

define(['json!data/CodeStudio.json', 'angular', 'ace/ace', 'jquery'], function (data, angular, ace, jquery) {
    angular.module('CodeStudio', []).controller('explorer', function ($scope, $http) {
        $scope.explorer = data;
        $scope.path = data.path;
        $scope.items = data.pathtree;

        var file = '';
        $http.get('/document?file=' + file).success(function (data) {
            $scope.sourcecode = data;

            var editor = ace.edit('editor'),
                session = editor.getSession();

            session.setMode('ace/mode/html');
            editor.setTheme('ace/theme/chrome');
            session.setUseWrapMode(true);
            editor.setShowPrintMargin(false);
            session.setValue(data);
            editor.setOption('minLines', 50);
            editor.setOption('maxLines', 90000);
        });

    });
    // run
    angular.bootstrap(document, ['CodeStudio']);
});

//https://ide.coding.net/ws/ocuxkk