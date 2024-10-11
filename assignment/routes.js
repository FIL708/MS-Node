const routes = (req, res) => {
    const { url, method } = req;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>HOME</title></head>");
        res.write("<body>");
        res.write("<h1>Hello everyone!</h1>");
        res.write(
            '<form action="create-user" method="POST"><input type="text" name="create-user"><button type="submit">Create User</button></form>'
        );
        res.write("</body>");
        res.write("</html>");
        res.end();
    }

    if (url === "/users") {
        res.write("<html>");
        res.write("<head><title>USERS</title></head>");
        res.write("<body>");
        res.write("<h1>List of users</h1>");
        res.write("<ul>");
        for (let index = 0; index < 7; index++) {
            res.write(`<li>User ${index + 1}</li>`);
        }
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }

    if (url === "/create-user" && method === "POST") {
        const inputData = [];

        req.on("data", (chunk) => {
            inputData.push(chunk);
        });

        return req.on("end", () => {
            const parsedData = Buffer.concat(inputData).toString();
            const data = parsedData.split("=")[1];
            console.log(data);

            res.statusCode = 302;
            res.setHeader("Location", "/users");
            res.end();
        });
    }
};

module.exports = routes;
