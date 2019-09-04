const express = require("express");

const router = express.Router();

const db = require("./postDb");

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
// DELETE to /posts/:id
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

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
