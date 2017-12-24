define(['jquery', 'angular', 'ace/ace', 'tree-control', 'json!data/CodeStudio.json', 'modemap','ace/ext-language_tools'], function ($, angular, ace, tree, data, mode,tool) {
	var editor = ace.edit('editor'),
		session = editor.getSession();

	var items = data.pathtree.children;
	//for (var i = 0; i < items.length; i++) {
	//    items[i].name
	//}

	session.setUseWrapMode(true);
	editor.setShowPrintMargin(false);
	editor.setFontSize(14);
	editor.setOption('minLines', 50);
	editor.setOption('maxLines', 90000);

	// ace.require("ace/ext/language_tools");  
	var editor = ace.edit("editor");  
	editor.setOptions({  
//      enableBasicAutocompletion: true,  
//      enableSnippets: true,  
		enableLiveAutocompletion: true,//只能补全  
	});  
	// editor.setTheme('ace/theme/chrome');
	editor.setTheme("ace/theme/monokai");//monokai模式是自动显示补全提示  
	editor.getSession().setMode("ace/mode/javascript");//语言  
	editor.setFontSize(16);  

	var code = ''.concat(
		'<!DOCTYPE HTML>\n',
		'<html lang="en-US">\n',
		'<head>\n',
		'\t<meta charset="UTF-8">\n',
		'\t<title>测试页面</title>\n',
		'\t<style type="text/css">\n',
		'\r\t</style>\n',
		'\t<script type="text/javascript" src="js/lib/jquery-2.1.3.js"></script>\n',
		'</head>\n',
		'<body>\n\r',
		'</body>\n',
		'</html>\n');
	// session.setMode(mode['html']);
	session.setValue(code);

	angular.module('CodeStudio', ['treeControl']).controller('documents', function ($rootScope, $scope, $http) {
		var list = [];
		$scope.showSolution = true; // 默认隐藏解决方案管理器

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
		$scope.afterSelect = function (node) {
			$scope.title = node.name;
			$scope.path = node.name;
			if (!node.path) {
				var doc = data.path + '/' + node.curPath + '/' + node.name;

				$http.get('/document?doc=' + doc).success(function (data) {
					session.setMode(mode[node.icon]);
					session.setValue(data);

					$scope.code = data;
				});
			}
		};
		// 显示/隐藏解决方案管理器
		$scope.toggleSolution = function () {
			$scope.showSolution = !$scope.showSolution;
			$scope.curPath = 'test';
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
		$scope.preview = function () {
			//var win = window.open("file:///F:\resource\CSS3\图解CSS3核心技术与案例实战源码\code\chapter-3\3-22.html");
			//win.document.write(code);

			var code = session.getValue();
			code = code.replace(/\+/gi, 'w3plussign');
			code = code.replace(/=/gi, "w3equalsign");
			code = code.replace(/script/gi, "w3scrw3ipttag");
			//$scope.code = encodeURI(code);

			$('input[name="code"]').val(encodeURI(code));
			var form = document.getElementById('tryitform');
			form.action = '/result?x=' + Math.random();
			$(form).submit();
		}
		//$scope.init();
	});
});
