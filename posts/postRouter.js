const express = require("express");

const router = express.Router();

const dbPosts = require("./postDb");

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
  dbPosts
    .remove(id)
    .then(count =>
      response.status(200).json({ message: `${count} comment deleted` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete comment" })
    );
});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(request, response, next) {
  const { id } = request.params;
  // dbPosts is the Post db being imported. getById is one of the functions with that db
  dbPosts
    .getById(id)
    .then(count => {
      console.log("count success", count);
      if (count) {
        next();
      } else {
        response.status(400).json({ message: "post id not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "failed validation request" });
    });
}

module.exports = router;
