const express = require("express");

const router = express.Router();

const dbPosts = require("./postDb");

router.use(express.json());

// GET to /posts/
router.get("/", (request, response) => {
  //   response.send("get to /posts/");
  dbPosts
    .get()
    .then(post => {
      //   console.log("get posts success", post);
      response.status(200).json(post);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get posts" })
    );
});

// GET to /posts/:id
router.get("/:id", validatePostId, (request, response) => {
  const { id } = request.params;
  //   response.send(`get to /posts/${id}`);
  dbPosts
    .getById(id)
    .then(post => {
      //   console.log("get by id post success", post);
      response.status(200).json(post);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get post by id " })
    );
});

// DELETE to /posts/:id
router.delete("/:id", validatePostId, (request, response) => {
  const { id } = request.params;
  dbPosts
    .remove(id)
    .then(count =>
      response
        .status(200)
        .json({ message: `${count} post deleted for id ${id}` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete post" })
    );
});

// PUT to /posts/:id
// text and user_id requrired

router.put("/:id", validatePostId, (request, response) => {
  console.log("/posts/:id");
  const { id } = request.params;
  const body = request.body;
  console.log("put body", body);

  dbPosts
    .update(id, body)
    .then(post => {
      //   console.log(post)
      response.status(200).json({ message: `post updated for id ${id}` });
    })
    .catch(error =>
      response.status(500).json({ message: "failed to update post" })
    );
});

// custom middleware

function validatePostId(request, response, next) {
  const { id } = request.params;
  // dbPosts is the Post db being imported. getById is one of the functions with that db
  dbPosts
    .getById(id)
    .then(post => {
      console.log("validatePostId success", post);
      if (post) {
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
