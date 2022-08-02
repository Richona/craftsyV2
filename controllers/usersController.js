module.exports = {
    login: function (req, res, next) {
        return res.render('login');
    },
    register: function (req, res, next) {
        return res.render('register');
    },
    profile: function (req, res, next) {
        return res.render('profile');
    }
}