const express = require("express");

const router = express.Router();

const dbUsers = require("./userDb");
const dbPosts = require("../posts/postDb");

router.use(express.json());

// POST to /users/
// name required
router.post("/", (request, response) => {});

// POST to /users/
// name and user_id required
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
  dbUsers
    .remove(id)
    .then(count =>
      response.status(200).json({ message: `${count} comment deleted` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete comment" })
    );
});

// PUT to users/:id
//
router.put("/:id", (request, response) => {});

//custom middleware

function validateUserId(request, response, next) {
  const { id } = request.params;
  // dbUsers is the User db being imported. getById is one of the functions with that db
  dbUsers
    .getById(id)
    .then(count => {
      console.log("count success", count);
      if (count) {
        next();
      } else {
        response.status(400).json({ message: "user id not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "failed validation request" });
    });
}

function validateUser(request, response, next) {}

function validatePost(request, response, next) {}

module.exports = router;
