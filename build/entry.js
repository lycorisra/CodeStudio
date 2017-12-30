
const vendor = {
    lib: [
        'js/lib/jquery.js',
        'js/lib/ejs.js'
    ]
}

module.exports = [
    {
        name: 'tool',
        entry: {
            'tool/tryit': 'tools/tryit/index'
        }
    }
]