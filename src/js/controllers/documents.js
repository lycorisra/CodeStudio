define(['angular', 'ace/ace', 'modemap', 'tree-control'], function (angular, ace, mode, tree) {

    angular.module('CodeStudio', []).controller('documents', function ($rootScope, $scope, $http) {
        var list = [];
        $scope.showSolution = false; // 默认隐藏解决方案管理器

        $scope.init = function () {
            require(['json!data/CodeStudio1.json'], function (data) {
                //$scope.baseurl = data.path;
                //$scope.nodes = data.documents;
                //$scope.items = data.documents.children;

                $scope.treedata = data.documents;
                $scope.showSelected = function (sel) {
                    $scope.selectedNode = sel;
                };
            });
        };
        // 显示/隐藏解决方案管理器
        $scope.toggleSolution = function () {
            $scope.showSolution = !$scope.showSolution;
        };
        // 点击编辑器，隐藏解决方案管理器
        $scope.hideSolution = function () {
            $scope.showSolution = false;
        };
        // 显示/隐藏解决方案管理器
        //$rootScope.opendocument = function () {
        //    $scope.$broadcast('open.document');
        //};
        $scope.open = function (item) {
            var file = '';

            $scope.title = item.name;
            $scope.path = item.name;
            $http.get('/document?doc=' + item.fullname).success(function (data) {
                $scope.sourcecode = data;

                var editor = ace.edit('editor'),
                    session = editor.getSession();

                session.setMode(mode[item.icon]);
                editor.setTheme('ace/theme/chrome');
                session.setUseWrapMode(true);
                editor.setShowPrintMargin(false);
                session.setValue(data);
                editor.setOption('minLines', 50);
                editor.setOption('maxLines', 90000);
            });
        };

        $scope.init();
    });
});
