const { Router } = require("express");

const usersData = [];

exports.router = Router()
    .get("/", (req, res) => {
        res.render("add-user", {
            pageTitle: "Add User",
            activePage: "add-user",
        });
    })
    .post("/", (req, res) => {
        const { name, surname, avatar } = req.body;
        usersData.push({ id: usersData.length + 1, name, surname, avatar });
        res.redirect("/users");
    });

exports.usersData = usersData;
