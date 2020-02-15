module.exports = (role) => {
    return (req, res, next) => {
        if (role === "customer" && req.session.currentUser.isCustomer) {
            next();
        } else if (role === "seller" && !req.session.currentUser.isCustomer) {
            next();
        } else {
            res.redirect("/myshop/login")
        }
    }
}