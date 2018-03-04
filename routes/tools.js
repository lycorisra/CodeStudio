module.exports = (app, control, view) => {
    app.get('/tryit', view('tools/tryit'));

    // app.post('/result', control('tool:result'));
}