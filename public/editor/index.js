// var ace = require('../asset/js/lib/ace/src/ace.js');

var editor = null, session;
var map = {
    html: 'ace/mode/html',
    ejs: 'ace/mode/ejs',
    css: 'ace/mode/css',
    js: 'ace/mode/javascript'
}
function init(option) {
    option = option || {};

    editor = ace.edit('editor');
    session = editor.getSession();

    editor.setTheme('ace/theme/chaos');
    editor.setShowPrintMargin(false);
    editor.setDisplayIndentGuides(false);
    editor.setHighlightSelectedWord(true);
    editor.setOption('minLines', 50);
    editor.setOption('fontSize', 14);
    editor.setOption('maxLines', 90000);

    session.setMode(option.mode || 'ace/mode/javascript');
    session.setUseWrapMode(true);
}
function setValue(content, filetype) {
    var selection = window.getSelection();
    selection.removeAllRanges();
    
    session.setMode(map[filetype] || 'ace/mode/html');
    editor.setValue(content);
}

export { init, setValue }