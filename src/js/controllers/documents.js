define(['angular', 'ace/ace', 'tree-control', 'json!data/CodeStudio.json'], function (angular, ace, tree,data) {

    angular.module('CodeStudio', ['treeControl']).controller('documents', function ($rootScope, $scope, $http) {
        var list = [];
        $scope.showSolution = false; // 默认隐藏解决方案管理器


        $scope.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }
        $scope.dataForTheTree = data.pathtree.children;
        $scope.treedata = data.documents;
        $scope.showSelected = function (sel) {
            $scope.selectedNode = sel;
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



        //$scope.init();
    });
});
