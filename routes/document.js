module.exports = (app, control, view) => {
    app.get('/', view('home/index'));

    app.get('/document', control('document:read'));

    app.get('/savedoc', control('document:save'));
}