require.config({
    //baseUrl: 'js/',
    paths: {
        jquery: 'js/lib/jquery-2.1.3',
        angular: 'js/lib/angular',
        ace: 'js/lib/ace/src/',
        text: 'js/lib/requirejs-plugins/text',
        json: 'js/lib/requirejs-plugins/json',
        'tree-control': 'res/angular-tree-control/angular-tree-control',
        contextmenu: 'js/lib/contextmenu/jquery.contextMenu',

        modemap: 'js/lib/ace/modemap',
        documents: 'js/controllers/documents'
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