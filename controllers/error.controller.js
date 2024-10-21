const getNotFound = (req, res) => {
    res.status(404).render("404", {
        pageTitle: "Page not found",
        path: "/error",
    });
};

module.exports = { getNotFound };
