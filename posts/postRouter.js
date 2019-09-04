const express = require("express");

const router = express.Router();

router.use(express.json());

// GET to /posts/
router.get("/", (request, response) => {
  response.send("get to /posts/");
});

// GET to /posts/:id
router.get("/:id", (request, response) => {
  const { id } = request.params;
  response.send(`get to /posts/${id}`);
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
