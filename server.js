const express = require("express");

const server = express();

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

// global middleware
server.use(express.json());

// use the productsRouter whenever you go to /products
server.use(`/posts`, postRouter);
server.use(`/users`, userRouter);

server.get("/", (request, response) => {
  response.status(200).json({ api: "up" });
});

//custom middleware

function logger(request, response, next) {}

module.exports = server;
