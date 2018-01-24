module.exports = (app, control, view) => {
    app.get('/', view('tools/tryit'));

    app.get('/document', control('document:read'));

    app.get('/savedoc', control('document:save'));

    // app.get('/tryit', control('tool:tryit'));

    // app.post('/result', control('tool:result'));
}