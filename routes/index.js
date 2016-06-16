module.exports = function(app, basePage) {
    app.get('*', function (req, res) {
        res.sendFile(basePage);
    });
};