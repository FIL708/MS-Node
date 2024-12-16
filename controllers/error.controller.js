const getNotFound = (req, res) => {
    res.status(404).render("404", {
        pageTitle: "Page not found",
        path: "/error",
        isAuthenticated: req.session.isLoggedIn,
    });
};

const get500 = (req, res) => {
    res.status(500).render("500", {
        pageTitle: "Error!",
        path: "/error",
        isAuthenticated: req.session.isLoggedIn,
    });
};

module.exports = { getNotFound, get500 };
