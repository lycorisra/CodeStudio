require.config({
    //baseUrl: 'js/',
    paths: {
        jquery: 'js/client/lib/jquery-2.1.3',
        angular: 'js/client/lib/angular',
        ace: 'js/client/lib/ace/src/',
        text: 'js/client/lib/requirejs-plugins/text',
        json: 'js/client/lib/requirejs-plugins/json',
        'tree-control': 'res/angular-tree-control/angular-tree-control',

        modemap: 'js/client/lib/ace/modemap',
        documents: 'js/client/documents'
    },
    shim: {
        'angular': { exports: 'angular' }
    }
});
require(['documents'], function () {
    // run
    angular.bootstrap(document, ['CodeStudio']);
});


//https://ide.coding.net/ws/ocuxkk