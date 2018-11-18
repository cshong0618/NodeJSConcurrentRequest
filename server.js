const express = require("express");
const axios = require("axios");

var app = express();

const baseUrl = "https://jsonplaceholder.typicode.com";

app.get("/user/:userId", (req, res) => {
    var userId = req.params.userId;

    axios.all([
        axios.get(baseUrl + `/users/${userId}`),
        axios.get(baseUrl + `/todos/?userId=${userId}`),
        axios.get(baseUrl + `/posts/?userId=${userId}`)
    ]).then(axios.spread((user, todos, posts) => {
        var response = {}
        response.user = user.data || null;
        response.todos = todos.data || null;
        response.posts = posts.data || null;

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(response));
    })).catch((err) => {
        res.writeHead(500);
    });
});

app.listen(7777, "0.0.0.0", () => {

});