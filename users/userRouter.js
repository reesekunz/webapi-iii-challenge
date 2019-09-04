const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

// GET to /users/
router.get("/", (request, response) => {
  response.send("get to /users/");
});

// GET to /users/:id
router.get("/:id", (request, response) => {
  const { id } = request.params;
  response.send(`get to /users/${id}`);
});

// GET to /users/:id/posts
router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
