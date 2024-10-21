const getPageNotFound = (req, res) => {
    res.status(404).render("404", { pageTitle: "Page not found" });
};

module.exports = { get: getPageNotFound };
