define(['angular', 'ace/ace'], function (angular, ace) {
    angular.module('CodeStudio', []).controller('documents', function ($rootScope, $scope, $http) {
        var list = [];
        $scope.showSolution = false; // 默认隐藏解决方案管理器

        $scope.init = function () {
            require(['json!data/CodeStudio.json'], function (data) {
                $scope.baseurl = data.path;
                list = $scope.items = data.pathtree;
            });
        };
        // 显示/隐藏解决方案管理器
        $scope.toggleSolution = function () {
            $scope.showSolution = !$scope.showSolution;
        };
        // 显示/隐藏解决方案管理器
        //$rootScope.opendocument = function () {
        //    $scope.$broadcast('open.document');
        //};
        $scope.open = function (event) {
            var file = '';

            $scope.title = event.target.innerText;
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
        };
        //$rootScope.$on('open.document', function (event, data) {
            
        //});

        $scope.init();
    });
});
