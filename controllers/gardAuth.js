

exports.GardAuthFunction = (req, res, next) => {

    if (req.session.userId) {
        res.redirect("/")
    }
    else {
        next()
    }
}
exports.productGardAuthFunction = (req, res, next) => {
    if (req.session.userId) {
        next()
    }
    else {
        res.redirect("/login");
    }
}

