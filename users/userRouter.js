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
  //   response.send("get to /users/");
  dbUsers
    .get()
    .then(post => {
      response.status(200).json(post);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get users" })
    );
});

// GET to /users/:id
router.get("/:id", validateUserId, (request, response) => {
  const { id } = request.params;
  //   response.send(`get to /users/${id}`);
  dbUsers
    .getById(id)
    .then(user => {
      response.status(200).json(user);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get user by id " })
    );
});

// GET to /users/:id/posts
router.get("/:id/posts", (request, response) => {
  const { id } = request.params;
  //   response.send(`get to /users/${id}/posts`);
});

// DELETE to /users/:id
router.delete("/:id", validateUserId, (request, response) => {
  const { id } = request.params;
  dbUsers
    .remove(id)
    .then(count =>
      response
        .status(200)
        .json({ message: `${count} user deleted for id ${id}` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete user" })
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

// name and user_id required
function validateUser(request, response, next) {
  if (!request.body) {
    response.status(400).json({ message: "user data not found" });
  } else if (!request.body.name) {
    response.status(400).json({ message: "name is required" });
  } else if (!request.body.user_id) {
    response.status(400).json({ message: "user_id is required" });
  }
  next();
}

// text is required
function validatePost(request, response, next) {
  if (!request.body) {
    response.status(400).json({ message: "post data not found" });
  } else if (!request.body.text) {
    response.status(400).json({ message: "text is required" });
  }
  next();
}

module.exports = router;
