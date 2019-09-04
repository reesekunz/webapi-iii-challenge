const express = require("express");

const router = express.Router();

const db = require("./userDb");

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
router.get("/:id/posts", (request, response) => {
  const { id } = request.params;
  response.send(`get to /users/${id}/posts`);
});
// DELETE to /users/:id
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  db.remove(id)
    .then(count =>
      response.status(200).json({ message: `${count} comment deleted` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete comment" })
    );
});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
