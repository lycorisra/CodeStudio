define(['jquery','angular', 'contextmenu'], function ($,angular, contextmenu) {
    'use strict';

    function createPath(startScope) {
        return function path() {
            var _path = [];
            var scope = startScope;
            var prevNode;
            while (scope && scope.node !== startScope.synteticRoot) {
                if (prevNode !== scope.node)
                    _path.push(scope.node);
                prevNode = scope.node;
                scope = scope.$parent;
            }
            return _path;
        }
    }

    function ensureDefault(obj, prop, value) {
        if (!obj.hasOwnProperty(prop))
            obj[prop] = value;
    }

    function defaultIsLeaf(node, $scope) {
        return !node[$scope.options.nodeChildren] || node[$scope.options.nodeChildren].length === 0;
    }

    function shallowCopy(src, dst) {
        if (angular.isArray(src)) {
            dst = dst || [];

            for (var i = 0; i < src.length; i++) {
                dst[i] = src[i];
            }
        }
        else if (angular.isObject(src)) {
            dst = dst || {};

            for (var key in src) {
                if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                    dst[key] = src[key];
                }
            }
        }

        return dst || src;
    }
    function defaultEquality(a, b, $scope) {
        if (!a || !b)
            return false;
        a = shallowCopy(a);
        a[$scope.options.nodeChildren] = [];
        b = shallowCopy(b);
        b[$scope.options.nodeChildren] = [];
        return angular.equals(a, b);
    }

    function defaultIsSelectable() {
        return true;
    }

    function ensureAllDefaultOptions($scope) {
        ensureDefault($scope.options, "multiSelection", false);
        ensureDefault($scope.options, "nodeChildren", "children");
        ensureDefault($scope.options, "dirSelectable", "true");
        ensureDefault($scope.options, "injectClasses", {});
        ensureDefault($scope.options.injectClasses, "ul", "");
        ensureDefault($scope.options.injectClasses, "li", "");
        ensureDefault($scope.options.injectClasses, "liSelected", "");
        ensureDefault($scope.options.injectClasses, "iExpanded", "");
        ensureDefault($scope.options.injectClasses, "iCollapsed", "");
        ensureDefault($scope.options.injectClasses, "iLeaf", "");
        ensureDefault($scope.options.injectClasses, "label", "");
        ensureDefault($scope.options.injectClasses, "labelSelected", "");
        ensureDefault($scope.options, "equality", defaultEquality);
        ensureDefault($scope.options, "isLeaf", defaultIsLeaf);
        ensureDefault($scope.options, "allowDeselect", true);
        ensureDefault($scope.options, "isSelectable", defaultIsSelectable);
    }
    angular.module('treeControl', [])
        .constant('treeConfig', {
            templateUrl: null
        })
        .directive('treecontrol', ['$compile', function ($compile) {
            /**
             * @param cssClass - the css class
             * @param addClassProperty - should we wrap the class name with class=""
             */
            function classIfDefined(cssClass, addClassProperty) {
                var css = '';
                if (cssClass) {
                    css = addClassProperty ? 'class="' + cssClass + '"' : cssClass;
                }
                return css;
            }

            return {
                restrict: 'EA',
                //require: "treecontrol",
                transclude: true,
                scope: {
                    treeModel: "=",
                    selectedNode: "=?",
                    selectedNodes: "=?",
                    expandedNodes: "=?",
                    onSelect: "&",
                    onNodeToggle: "&",
                    options: "=?",
                    orderBy: "=?",
                    reverseOrder: "@",
                    filterExpression: "=?",
                    filterComparator: "=?"
                },
                controller: ['$scope', '$templateCache', '$interpolate', 'treeConfig', function ($scope, $templateCache, $interpolate, treeConfig) {

                    $scope.options = $scope.options || {};

                    ensureAllDefaultOptions($scope);

                    $scope.selectedNodes = $scope.selectedNodes || [];
                    $scope.expandedNodes = $scope.expandedNodes || [];
                    $scope.expandedNodesMap = {};
                    for (var i = 0; i < $scope.expandedNodes.length; i++) {
                        $scope.expandedNodesMap["a" + i] = $scope.expandedNodes[i];
                    }
                    $scope.parentScopeOfTree = $scope.$parent;

                    function isSelectedNode(node) {
                        if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode, $scope)))
                            return true;
                        else if ($scope.options.multiSelection && $scope.selectedNodes) {
                            for (var i = 0; (i < $scope.selectedNodes.length) ; i++) {
                                if ($scope.options.equality(node, $scope.selectedNodes[i], $scope)) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    }

                    $scope.headClass = function (node) {
                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                        var injectSelectionClass = '';
                        if (liSelectionClass && isSelectedNode(node))
                            injectSelectionClass += " " + liSelectionClass;
                        if ($scope.options.isLeaf(node, $scope))
                            return "tree-leaf" + injectSelectionClass;
                        if ($scope.expandedNodesMap[this.$id])
                            return "tree-expanded" + injectSelectionClass;
                        else
                            return "tree-collapsed" + injectSelectionClass;
                    };

                    $scope.iBranchClass = function () {
                        if ($scope.expandedNodesMap[this.$id])
                            return classIfDefined($scope.options.injectClasses.iExpanded);
                        else
                            return classIfDefined($scope.options.injectClasses.iCollapsed);
                    };

                    $scope.icon = function (node) {
                        return node.icon;
                    };

                    $scope.nodeExpanded = function () {
                        return !!$scope.expandedNodesMap[this.$id];
                    };

                    $scope.selectNode = function (node, $event) {
                        if (!node.path && node.level == 1)
                            $scope.curPath = '';
                        else
                            $scope.curPath = node.path || $scope.curPath || '';
                        var isLeaf = !node.path,         // 是否是叶子节点，叶子节点的path属性为null
                            transcludedScope = this,
                            expandedNodes = $scope.expandedNodes,
                            nodes = [],
                            expanding = $scope.expandedNodesMap[transcludedScope.$id] === undefined;

                        if (isLeaf) {
                            $scope.selectedNode = node;
                            //$scope.curPath += '/' + node.name;
                        }
                        else {
                            $scope.expandedNodesMap[transcludedScope.$id] = (expanding ? transcludedScope.node : undefined);
                            if (expanding) {
                                var nodeName = '';
                                for (var i = 0; i < expandedNodes.length; i++) {
                                    if ($scope.curPath.indexOf(expandedNodes[i].path) == 0 && nodeName != expandedNodes[i].name) {
                                        nodes.push(expandedNodes[i]);
                                        nodeName = expandedNodes[i].name;
                                    }
                                }
                                expandedNodes = nodes;
                                expandedNodes.push(transcludedScope.node);
                            }
                            $scope.expandedNodes = expandedNodes;
                        }
                        node.curPath = $scope.curPath;
                        $scope.onSelect && $scope.onSelect({ node: node});
                        // 阻止事件冒泡
                        $event.stopPropagation();
                        //$scope.rightClick();
                    };

                    $scope.selectedClass = function () {
                        var level = 'level' + this.node.level;
                        var isThisNodeSelected = isSelectedNode(this.node);
                        var labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
                        var injectSelectionClass = " ";
                        if (labelSelectionClass && isThisNodeSelected)
                            injectSelectionClass = " " + labelSelectionClass;

                        return level + (isThisNodeSelected ? " tree-selected" + injectSelectionClass : "");
                    };

                    $scope.unselectableClass = function () {
                        var isThisNodeUnselectable = !$scope.options.isSelectable(this.node);
                        var labelUnselectableClass = classIfDefined($scope.options.injectClasses.labelUnselectable, false);
                        return isThisNodeUnselectable ? "tree-unselectable " + labelUnselectableClass : "";
                    };

                    $scope.rightClick = function (el) {

                        $.contextMenu({
                            selector: '.tree-label',
                            callback: function (key, options,a,b,c) {
                                var m = "clicked: " + key + " on " + $(this).text();
                                console.log(m);
                            },
                            items: {
                                "open": { name: "在资源管理器中打开文件夹(O)", icon: "open" },
                                "preview": { name: "在浏览器中查看", icon: "paste" },
                                "copy": { name: "复制路径(O)", icon: "copy" },
                                "delete": { name: "删除(D)", icon: "delete" },
                                "rename": { name: "重命名(C)", icon: "copy" }
                            }
                        });
                    }

                    //tree template
                    $scope.isReverse = function () {
                        return !($scope.reverseOrder === 'false' || $scope.reverseOrder === 'False' || $scope.reverseOrder === '' || $scope.reverseOrder === false);
                    };

                    $scope.orderByFunc = function () {
                        return $scope.orderBy;
                    };

                    var templateOptions = {
                        orderBy: $scope.orderBy ? " | orderBy:orderByFunc():isReverse()" : '',
                        ulClass: classIfDefined($scope.options.injectClasses.ul, true),
                        nodeChildren: $scope.options.nodeChildren,
                        liClass: classIfDefined($scope.options.injectClasses.li, true),
                        iLeafClass: classIfDefined($scope.options.injectClasses.iLeaf, false),
                        labelClass: classIfDefined($scope.options.injectClasses.label, false)
                        //icon: $scope.icon()
                    };

                    var template;
                    var templateUrl = $scope.options.templateUrl || treeConfig.templateUrl;

                    if (templateUrl) {
                        template = $templateCache.get(templateUrl);
                    }

                    if (!template) {
                        template =
                            '<ul {{options.ulClass}} >' +
                            '<li ng-repeat="node in node.{{options.nodeChildren}}" ng-class="headClass(node)" set-node-to-data ng-click="selectNode(node,$event)">' +
                            '<div class="tree-label" ng-class="[selectedClass(), unselectableClass()]" tree-transclude>' +
                            '<i class="iconfont" ng-class="[icon(node)]"></i>' +
                            '</div>' +
                            '<treeitem ng-if="nodeExpanded()"></treeitem>' +
                            '</li>' +
                            '</ul>';
                    }

                    this.template = $compile($interpolate(template)({ options: templateOptions }));
                }],
                compile: function (element, attrs, childTranscludeFn) {
                    return function (scope, element, attrs, treemodelCntr) {

                        scope.$watch("treeModel", function updateNodeOnRootScope(newValue) {
                            if (angular.isArray(newValue)) {
                                if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
                                    return;
                                scope.node = {};
                                scope.synteticRoot = scope.node;
                                scope.node[scope.options.nodeChildren] = newValue;
                            }
                            else {
                                if (angular.equals(scope.node, newValue))
                                    return;
                                scope.node = newValue;
                            }
                        });

                        scope.$watchCollection('expandedNodes', function (newValue, oldValue) {
                            var notFoundIds = 0;
                            var newExpandedNodesMap = {};
                            var $liElements = element.find('li');
                            var existingScopes = [];
                            // find all nodes visible on the tree and the scope $id of the scopes including them
                            angular.forEach($liElements, function (liElement) {
                                var $liElement = angular.element(liElement);
                                var liScope = {
                                    $id: $liElement.data('scope-id'),
                                    node: $liElement.data('node')
                                };
                                existingScopes.push(liScope);
                            });
                            // iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
                            // if found, add the mapping $id -> node into newExpandedNodesMap
                            // if not found, add the mapping num -> node into newExpandedNodesMap
                            angular.forEach(newValue, function (newExNode) {
                                var found = false;
                                for (var i = 0; (i < existingScopes.length) && !found; i++) {
                                    var existingScope = existingScopes[i];
                                    if (scope.options.equality(newExNode, existingScope.node, scope)) {
                                        newExpandedNodesMap[existingScope.$id] = existingScope.node;
                                        found = true;
                                    }
                                }
                                if (!found)
                                    newExpandedNodesMap['a' + notFoundIds++] = newExNode;
                            });
                            scope.expandedNodesMap = newExpandedNodesMap;
                        });
                        //Rendering template for a root node
                        treemodelCntr.template(scope, function (clone) {
                            element.html('').append(clone);
                        });
                        // save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
                        // we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
                        // to keep using the compile function
                        scope.$treeTransclude = childTranscludeFn;
                    };
                }
            };
        }])
        .directive("setNodeToData", ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {
                    $element.data('node', $scope.node);
                    $element.data('scope-id', $scope.$id);
                }
            };
        }])
        .directive("treeitem", function () {
            return {
                restrict: 'E',
                require: "^treecontrol",
                link: function (scope, element, attrs, treemodelCntr) {
                    // Rendering template for the current node
                    treemodelCntr.template(scope, function (clone) {
                        element.html('').append(clone);
                    });
                }
            };
        })
        .directive("treeTransclude", function () {
            return {
                restrict: 'EA',
                controller: ['$scope', function ($scope) {
                    ensureAllDefaultOptions($scope);
                }],

                link: function (scope, element, attrs, controller) {
                    // create a scope for the transclusion, whos parent is the parent of the tree control
                    scope.transcludeScope = scope.parentScopeOfTree.$new();
                    scope.transcludeScope.node = scope.node;
                    scope.transcludeScope.$path = createPath(scope);
                    scope.transcludeScope.$parentNode = (scope.$parent.node === scope.synteticRoot) ? null : scope.$parent.node;
                    scope.transcludeScope.$index = scope.$index;
                    scope.transcludeScope.$first = scope.$first;
                    scope.transcludeScope.$middle = scope.$middle;
                    scope.transcludeScope.$last = scope.$last;
                    scope.transcludeScope.$odd = scope.$odd;
                    scope.transcludeScope.$even = scope.$even;
                    scope.$on('$destroy', function () {
                        scope.transcludeScope.$destroy();
                    });
                    scope.$treeTransclude(scope.transcludeScope, function (clone) {
                        //element.empty();
                        element.append(clone);
                    });
                }
            };
        });
});