const getNotFound = (req, res) => {
    res.status(404).render("404", {
        pageTitle: "Page not found",
        path: "/error",
        isAuthenticated: req.session.isLoggedIn,
    });
};

module.exports = { getNotFound };
