module.exports = {
    index: function (req, res, next) {
        return res.render('index', { title: 'Express', name: "Richard" });
    },
    terms: function (req, res, next) {
        return res.render('terms', { title: 'Express', name: "Richard" });
    }
}