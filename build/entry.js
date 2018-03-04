const path = require('path');

const vendor = {
    lib: [
        'js/lib/jquery.js',
        'js/lib/ejs.js'
    ]
}

module.exports = [
    {
        name: 'index',
        template: 'html-loader!views/home/index.ejs',
        filename: path.resolve(__dirname, '../views/home/index.ejs'),
        entry: {
            'home/index': 'public/home/index.js'
        }
    },
    {
        name: 'tool',
        template: 'html-loader!views/tools/tryit.ejs',
        filename: path.resolve(__dirname, '../views/tools/tryit.ejs'),
        entry: {
            'tool/tryit': 'tools/tryit/index.js'
        }
    }
]