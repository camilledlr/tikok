module.exports = function protectAdminRoute(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/");
}